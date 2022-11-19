addLayer("i", {
    name: "Incentive", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        time: new Decimal(0)
    }},
    color: "#2a6d96",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "beliefs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "Theorem 1",
            description: "You get more dopamine per belief.",
            effect() {
                return (player.i.points.times(0.1)).add(1)
            },
            effectDisplay() {
                return "+" + format(this.effect())
            },
            cost: new Decimal(1),
        },
        12: {
            title: "Theorem 2",
            description: "The time spent in this prestige increases potential.",
            cost: new Decimal(10),
        },
        13: {
            title: "Conclusion",
            description: "The basic rudimentary elements do not contain much value.",
            cost: new Decimal(100),

        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset (incentive layer)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    automate() {
        player.i.time = player.i.time.add(0.05)
    }
})
