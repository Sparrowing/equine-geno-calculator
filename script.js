function Gene(name, alleleVariants) {

    this.name = name;
    this.alleleVariants = alleleVariants;
    this.alleles = [
        this.alleleVariants[0],
        this.alleleVariants[0]
    ];

    this.getDisplay = function() {
        var a = this.alleleVariants.indexOf(this.alleles[0]);
        var b = this.alleleVariants.indexOf(this.alleles[1]);
        return (b < a) ? this.alleles.slice().reverse().join('') : this.alleles.join('');
    };
}

var genes = {
    extension: new Gene("Extension", ['E', 'e'] ),
    agouti:    new Gene("Agouti",    ['A', 'Aᵗ', 'a'] )
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
