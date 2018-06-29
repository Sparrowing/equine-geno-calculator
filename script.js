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
}

var genes = {
    extension: new Gene("Extension", ['E', 'e'], 'E' ),
    agouti:    new Gene("Agouti",    ['A', 'Aᵗ', 'a'], 'a' ),
    dun:       new Gene("Dun",       ['D', 'd'], 'd' ),
    cream:     new Gene("Cream",     ['C', 'Cᶜʳ'], 'C'),
    champagne: new Gene("Champagne", ['Ch', 'ch'], 'ch'),
    silver:    new Gene("Silver",    ['Z', 'z'], 'z'),
    flaxen:    new Gene("Flaxen",    ['F', 'f'], 'f'),
    grey:      new Gene("Grey",      ['G', 'g'], 'g'),
    white:     new Gene("White",     ['n', 'W'], 'n'),
};

// Return true if set of genes has relevant traits/genes present, else false
function hasDun() { return genes.dun.containsAllele('D') }
function hasCream() { return genes.cream.containsAllele('Cᶜʳ') }
function hasChampagne() { return genes.champagne.containsAllele('Ch') }
function hasSilver() { return genes.silver.containsAllele('Z') }
function hasFlaxen() { return genes.flaxen.containsAllele('F') }
function hasGrey() { return genes.grey.containsAllele('G') }
function hasWhite() { return genes.white.containsAllele('W') }

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
            if (genes.extension.alleles[0] === 'e' && genes.extension.alleles[1] === 'e') {
                return "Chestnut";
            }
            if (genes.agouti.alleles[0] === 'a' && genes.agouti.alleles[1] === 'a') {
                return "Black";
            } else if (genes.agouti.alleles[0] === 'A' || genes.agouti.alleles[1] === 'A') {
                return "Bay";
            }
            return "Seal Bay";
        }
    }
});

})();
