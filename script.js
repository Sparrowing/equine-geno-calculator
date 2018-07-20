(function() {

function Gene(name, alleleVariants, alleleDefault) {

    this.name = name;
    this.alleleVariants = alleleVariants;
    this.alleles = [
        alleleDefault,
        alleleDefault
    ];

    this.getDisplay = function() {
        var a = this.alleleVariants.indexOf(this.alleles[0]);
        var b = this.alleleVariants.indexOf(this.alleles[1]);
        return (b < a) ? this.alleles.slice().reverse().join('') : this.alleles.join('');
        // slice() needed to reverse() doesn't reverse original this.alleles
    };

    // Returns true if specified allele is present either hetero or
    //    homozygously in this gene.  e.g. checking if allele 'E' exists in a
    //    gene of 'Ee' would return true
    this.containsAllele = function(allele) {
        return this.alleles.includes(allele);
    }

    // Returns true if given allele is is expressed by BOTH alleles on this
    //    gene, else false
    this.isHomozygousFor = function(allele) {
        return this.alleles[0] === allele && this.alleles[1] === allele;
    }
}

var genes = {
    extension: new Gene("Extension", ['E', 'e'], 'E' ),
    agouti:    new Gene("Agouti",    ['A', 'Aᵗ', 'a'], 'a' ),
    dun:       new Gene("Dun",       ['D', 'd'], 'd' ),
    cream:     new Gene("Cream",     ['C', 'Cᶜʳ'], 'C'),
    champagne: new Gene("Champagne", ['Ch', 'ch'], 'ch'),
    silver:    new Gene("Silver",    ['Z', 'z'], 'z'),
    flaxen:    new Gene("Flaxen",    ['F', 'f'], 'F'),
    grey:      new Gene("Grey",      ['G', 'g'], 'g'),
    white:     new Gene("White",     ['n', 'W'], 'n'),
};

// These functions eturn true if set of genes has relevant traits/genes present, else false
//    Note: Return true REGARDLESS of if the gene is expressed or not, only if
//          an allele exists that is noteworthy in a genotype (for example, carriers)
function hasDun()       { return genes.dun.containsAllele('D'); }
function hasCream()     { return genes.cream.containsAllele('Cᶜʳ'); }
function hasChampagne() { return genes.champagne.containsAllele('Ch'); }
function hasSilver()    { return genes.silver.containsAllele('Z'); }
function hasFlaxen()    { return genes.flaxen.containsAllele('f'); }
function hasGrey()      { return genes.grey.containsAllele('G'); }
function hasWhite()     { return genes.white.containsAllele('W'); }

// Simple boolean functions to aid phenotype logic
function isBlack()       { return genes.extension.containsAllele('E'); }
function isChestnut()    { return !isBlack(); }
function isBay()         { return genes.agouti.containsAllele('A'); }
function isSealBay()     { return genes.agouti.containsAllele('Aᵗ') && !isBay(); }
function isSingleCream() { return hasCream() && !genes.cream.isHomozygousFor('Cᶜʳ'); }
function isDoubleCream() { return genes.cream.isHomozygousFor('Cᶜʳ'); }
function isFlaxen()      { return genes.flaxen.isHomozygousFor('f'); }
function isSingleWhite() { return hasWhite() && !genes.white.isHomozygousFor('W'); }
function isDoubleWhite() { return genes.white.isHomozygousFor('W'); }

function getGeneHash() {
    // Gene hash is a string reading, in order, either y (true) or n (false) for
    //    each of the following boolean statements, consecutively in a string
    //    with no separator.
    var s = '';
    s += isBlack()       ? 'y' : 'n'; // 1  - Is black
    s += isBay()         ? 'y' : 'n'; // 2  - Is bay
    s += isSealBay()     ? 'y' : 'n'; // 3  - Is seal bay
    s += hasDun()        ? 'y' : 'n'; // 4  - Is dun
    s += isSingleCream() ? 'y' : 'n'; // 5  - Is single cream
    s += isDoubleCream() ? 'y' : 'n'; // 6  - Is double cream
    s += hasChampagne()  ? 'y' : 'n'; // 7  - Is champagne
    s += hasSilver()     ? 'y' : 'n'; // 8  - Is silver
    s += hasFlaxen()     ? 'y' : 'n'; // 9  - Is flaxen
    s += hasGrey()       ? 'y' : 'n'; // 10 - Is grey
    s += isSingleWhite() ? 'y' : 'n'; // 11 - Is single white
    s += isDoubleWhite() ? 'y' : 'n'; // 12 - Is double white
    return s;
}

function debugColors() {
    console.log("hasDun " + hasDun());
    console.log("hasCream " + hasCream());
    console.log("hasChampagne " + hasChampagne());
    console.log("hasSilver " + hasSilver());
    console.log("hasFlaxen " + hasFlaxen());
    console.log("hasGrey " + hasGrey());
    console.log("hasWhite " + hasWhite());
    console.log("isBlack " + isBlack());
    console.log("isChestnut " + isChestnut());
    console.log("isBay " + isBay());
    console.log("isSealBay " + isSealBay());
    console.log("isDoubleCream " + isDoubleCream());
    console.log("isFlaxen " + isFlaxen());
    console.log("isSingleWhite " + isSingleWhite());
    console.log("isDoubleWhite " + isDoubleWhite());
}

var app = new Vue({
    el: '#app',
    data: {
        genes: genes
    },
    computed: {

        fullGenotype: function() {
            // Build string manually; 'genes' stores genes as properties so unable
            //    to guarantee correct ordering.  White gene also needs to be
            //    excluded from genotype if not present.
            var genos = [
                genes.extension.getDisplay(),
                genes.agouti.getDisplay(),
                genes.dun.getDisplay(),
                genes.cream.getDisplay(),
                genes.champagne.getDisplay(),
                genes.silver.getDisplay(),
                genes.flaxen.getDisplay(),
                genes.grey.getDisplay()
            ];
            if (hasWhite()) genos.push(genes.white.getDisplay());

            // TODO TEMPORARY
            debugColors();

            return genos.join(' ');
        },

        simplifiedGenotype: function() {

            var genos = [
                genes.extension.getDisplay(),
                genes.agouti.getDisplay()
            ];
            if (hasDun())       genos.push(genes.dun.getDisplay());
            if (hasCream())     genos.push(genes.cream.getDisplay());
            if (hasChampagne()) genos.push(genes.champagne.getDisplay());
            if (hasSilver())    genos.push(genes.silver.getDisplay());
            if (hasFlaxen())    genos.push(genes.flaxen.getDisplay());
            if (hasGrey())      genos.push(genes.grey.getDisplay());
            if (hasWhite())     genos.push(genes.white.getDisplay());

            return genos.join(' ');
        },

        phenotype: function() {

            // Start with black as a base
            var color = "chestnut";

            if (isBlack())
                color = "black";

            // Apply agouti gene
            if (isBay()) {
                switch (color) {
                    case "black":
                        color = "bay";
                        break;
                }
            }

            if (isSealBay()) {
                switch (color) {
                    case "black":
                        color = "seal bay";
                        break;
                }
            }

            // Apply dun gene
            if (hasDun()) {
                switch (color) {
                    case "chestnut":
                        color = "red dun";
                        break;
                    case "black":
                        color = "grullo";
                        break;
                    case "bay":
                    case "seal bay":
                        color = "bay dun";
                        break;
                }
            }

            if (isSingleCream()) {
                switch (color) {
                    case "chestnut":
                        color = "palomino";
                        break;
                    case "black":
                        color = "smoky black";
                        break;
                    case "bay":
                    case "seal bay":
                        color = "buckskin";
                        break;
                    case "red dun":
                        color = "dunalino";
                        break;
                    case "grullo":
                        color = "smoky grullo";
                        break;
                    case "bay dun":
                        color = "dunskin";
                        break;
                }
            }

            else if (isDoubleCream()) {
                switch (color) {
                    case "chestnut":
                    case "red dun":
                        color = "cremello";
                        break;
                    case "black":
                        color = "smoky cream";
                        break;
                    case "bay":
                    case "seal bay":
                        color = "perlino";
                        break;
                    case "grullo":
                        color = "cream grullo";
                        break;
                    case "bay dun":
                        color = "perlino dun";
                }
            }

            if (hasChampagne()) {
                switch (color) {
                    case "chestnut":
                        color = "gold champagne";
                        break;
                    case "black":
                        color = "classic champagne";
                        break;
                    case "bay":
                    case "seal bay":
                        color = "amber champagne";
                        break;
                    case "red dun":
                        color = "gold dun";
                        break;
                    case "grullo":
                        color = "champagne dun";
                        break;
                    case "bay dun":
                        color = "amber dun";
                        break;
                    case "palomino":
                    case "dunalino":
                        color = "gold cream";
                        break;
                    case "smoky black":
                    case "smoky grullo":
                    case "smoky cream":
                    case "cream grullo":
                        color = "classic cream";
                        break;
                    case "buckskin":
                    case "dunskin":
                    case "perlino":
                    case "perlino dun":
                        color = "amber cream";
                        break;
                }
            }

            if (hasSilver()) {
                switch (color) {
                    case "black":
                    case "smoky black":
                        color = "silver dapple";
                        break;
                    case "bay":
                    case "seal bay":
                    case "bay dun":
                        color = "silver bay";
                        break;
                    case "grullo":
                    case "smoky grullo":
                        color = "silver grullo";
                        break;
                    case "buckskin":
                    case "dunskin":
                        color = "silver dapple buckskin";
                        break;
                    case "smoky cream":
                        color = "silver smoky cream";
                        break;
                    case "perlino":
                    case "perlino dun":
                        color = "silver perlino";
                        break;
                    case "cream grullo":
                        color = "silver cream grullo";
                        break;
                    case "classic champagne":
                        color = "silver classic champagne";
                        break;
                    case "amber champagne":
                    case "amber dun":
                        color = "silver amber champagne";
                        break;
                    case "champagne dun":
                        color = "silver champagne dun";
                        break;
                }
            }

            if (isFlaxen()) {
                switch (color) {
                    case "chestnut":
                        color = "flaxen chestnut";
                        break;
                    case "red dun":
                        color = "flaxen dun";
                        break;
                    case "gold champagne":
                        color = "flaxen gold champagne";
                        break;
                }
            }

            if (hasGrey()) {
                color += " (Grey)";
            }

            if (isSingleWhite()) {
                color = "dominant white";
            }

            else if (isDoubleWhite()) {
                color = "lethal white syndrome"
            }

            // Capitalize words of name
            var arr = color.split(" ");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1);
            }
            color = arr.join(" ");

            return color;


            // case "chestnut":
            // case "black":
            // case "bay":
            // case "seal bay":
            // case "red dun":
            // case "grullo":
            // case "bay dun":
            // case "palomino":
            // case "smoky black":
            // case "buckskin":
            // case "dunalino":
            // case "smoky grullo":
            // case "dunskin":
            // case "cremello":
            // case "smoky cream":
            // case "perlino":
            // case "cream grullo":
            // case "perlino dun":
            // case "gold champagne":
            // case "classic champagne":
            // case "amber champagne":
            // case "gold dun":
            // case "champagne dun":
            // case "amber dun":
            // case "gold cream":
            // case "classic cream":
            // case "amber cream":
            // case "silver dapple":
            // case "silver bay":
            // case "silver grullo":
            // case "silver dapple buckskin":
            // case "silver smoky cream":
            // case "silver perlino":
            // case "silver cream grullo":
            // case "silver classic champagne":
            // case "silver amber champagne":
            // case "silver champagne dun":
            // case "flaxen chestnut":
            // case "flaxen dun":
            // case "flaxen gold champagne":

        }
    }
});

})();
