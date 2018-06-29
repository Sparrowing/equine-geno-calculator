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
        // ^ slice() needed so reverse() doesn't reverse original this.alleles
    };
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
    white:     new Gene("White",     ['n', 'W'], 'n')
};


var app = new Vue({
    el: '#app',
    data: {
        genes: genes
    },
    computed: {
        genotype: function() {
            return genes.extension.getDisplay() + " " + genes.agouti.getDisplay();
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
