var genes = {
    extension: {
        name: "Extension",
        alleleVariants: [
            'E',
            'e'
        ],
        alleles: ['E', 'E'],
        get display() {
            if (this.alleles[0] === 'E' && this.alleles[1] === 'E') {
                return "EE";
            } else if (this.alleles[0] === 'E' || this.alleles[1] === 'E') {
                return "Ee";
            }
            return "ee";
        }
    },
    agouti: {
        name: "Agouti",
        alleleVariants: [
            'A',
            'Aᵗ',
            'a'
        ],
        alleles: ['A', 'A'],
        get display() {
            if (this.alleles[0] === 'A' || this.alleles[1] === 'A') { // A_
                if (this.alleles[0] === 'A' && this.alleles[1] === 'A') { // AA
                    return "AA";
                } else if (this.alleles[0] === 'Aᵗ' || this.alleles[1] === 'Aᵗ') { // AAᵗ
                    return "AAᵗ";
                }
                return "Aa";
            } else if (this.alleles[0] === 'Aᵗ' || this.alleles[1] === 'Aᵗ') { // Aᵗ_
                if (this.alleles[0] === 'Aᵗ' && this.alleles[1] === 'Aᵗ') {
                    return "AᵗAᵗ";
                }
                return "Aᵗa";
            }
            return "aa";
        }
    }
};


var app = new Vue({
    el: '#app',
    data: {
        genes: genes
    },
    computed: {
        genotype: function() {
            return genes.extension.display + " " + genes.agouti.display;
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
