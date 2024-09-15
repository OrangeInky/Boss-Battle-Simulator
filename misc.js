const choose = function(arr) {return arr[Math.floor(Math.random()*arr.length)];}
const getRandomIntGlobal = function(min,max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
// Function to choose an item based on weighted probabilities
const chooseWeighted = function(options, weights) {
    // Calculate the total sum of weights
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    // Generate a random number between 0 and totalWeight
    let random = Math.random() * totalWeight;

    // Iterate through options and subtract weight until we find where the random number falls
    for (let i = 0; i < options.length; i++) {
        if (random < weights[i]) {
            return options[i];
        }
        random -= weights[i];
    }
};
function cosmeticEquipmentNames(type) {
	const mysticalNames = [
  "Azgoth", "Valkura", "Morvane", "Thaldris", "Quorath", "Xelith", "Nyxir", "Zadros", "Falkin", "Durath",
  "Eldras", "Voroth", "Ilgrin", "Thamrys", "Kelvor", "Jorath", "Galthir", "Varune", "Selkith", "Ithros",
  "Lyzara", "Orvith", "Falaris", "Nyrva", "Zolkar", "Velkor", "Ylthar", "Malvak", "Rynmar", "Kaldros",
  "Sylvir", "Tovarin", "Xarnith", "Vandor", "Irdros", "Zalvor", "Valkith", "Rithan", "Gorath", "Ismir",
  "Felthas", "Dravor", "Thalor", "Jelzin", "Kalmar", "Zynith", "Selthar", "Vrynn", "Targor", "Haldir",
  "Xalar", "Fynris", "Velkyr", "Myzoth", "Sarion", "Kelvorn", "Thyros", "Zarith", "Valthos", "Tyrnath",
  "Orinth", "Balzareth", "Nyras", "Kalros", "Vorwin", "Eldrin", "Fyrion", "Zarnis", "Dalthor", "Valdris",
  "Zyraen", "Tharivor", "Jorvin", "Valdyn", "Falvor", "Ilgath", "Nythis", "Drazon", "Tormyn", "Selvath",
  "Ylvorn", "Varnis", "Thylis", "Zyvran", "Galros", "Thalys", "Xyvor", "Drannis", "Zylkar", "Morvath",
  "Velrin", "Torath", "Rynith", "Kalith", "Zorwyn", "Fynmar", "Salvor", "Veldros", "Yrmith", "Zanith",
  "Valmor", "Galdryn", "Xarnith", "Thalvorn"];
	const suffixes = [
  "of Eternal Flame", "of the Lost Realms", "of the Abyss", "of Forgotten Truths", "of Shattered Dreams", "of the Infinite Void", "of the Serpent’s Kiss", "of the Forsaken Ones", "of Darkened Souls", "of the Hidden Path",
  "of the Moon’s Shadow", "of Ethereal Winds", "of the Undying Spirit", "of the Eldritch Order", "of Celestial Light", "of the Sunless Sky", "of Arcane Whispers", "of the Stolen Heart", "of Sacred Ashes", "of the Frozen North",
  "of the Blazing Star", "of the Deep Waters", "of the Iron Will", "of Broken Chains", "of the Blood Moon", "of the Whispering Sands", "of Enigmatic Shadows", "of the Gilded Rose", "of the Thunderclap", "of the Crimson Tide",
  "of Endless Night", "of the Golden Feather", "of the Fallen Star", "of the Emerald Flame", "of the Storm's Eye", "of the Silver Fang", "of Relentless Fury", "of Shadowed Veil", "of the Quiet Mind", "of the Hidden Blade",
  "of the Shifting Winds", "of the Veil of Silence", "of the Radiant Dawn", "of the Dying Sun", "of the Twilight Realm", "of Fading Echoes", "of the Blackened Sky", "of Divine Grace", "of the Relentless Hunt", "of the Searing Light",
  "of the Howling Wolf", "of the Wailing Forest", "of the Midnight Sea", "of the Broken Crown", "of the Sapphire Storm", "of the Piercing Gaze", "of Silent Thunder", "of the Burning Tides", "of the Mystic Depths", "of the Hidden Flame",
  "of the Withered Hand", "of the Cursed Sands", "of the Radiant Heart", "of the Final Hour", "of the Shadowed Crypt", "of Endless Hunger", "of the Icebound Peaks", "of the Starless Night", "of Forgotten Legends", "of the Dread Horizon",
  "of the Mystic Dream", "of the Immortal Flame", "of the Rising Dawn", "of the Hollowed Blade", "of the Emerald Serpent", "of the Divine Pact", "of the Feral Claw", "of the Winter’s Bite", "of Forgotten Wounds", "of the Hidden Thorn",
  "of the Phantom Blade", "of the Void’s Edge", "of Eternal Twilight", "of the Last Horizon", "of the Crimson Gale", "of the Broken Oath", "of the Shattered Shield", "of Unyielding Fate", "of the Final Silence", "of the Tidal Storm",
  "of the Celestial Hunt", "of the Phantom Tide", "of the Dark Star", "of the Flame's Embrace", "of the Silver Dawn", "of the Starbound Path", "of the Lost Soul", "of the Woven Fate", "of the Endless Voyage", "of the Broken Veil"];
  const armorTypes = [
  "Breastplate", "Chainmail", "Plate Armor", "Scale Mail", "Brigandine", "Leather Armor", "Dragonhide", "Adamantine Armor", "Mythril Vest", "Crimson Cloak",
  "Bone Armor", "Shadow Mantle", "Warded Robes", "Aegis Shield", "Obsidian Plate", "Spectral Guard", "Warplate", "Duskshroud", "Iron Carapace", "Spellguard Vestments",
  "Serpent Scale", "Phoenix Feather Mail", "Astral Mantle", "Soulforged Armor", "Frostguard", "Dreadplate", "Golem Armor", "Void Cloak", "Lightmail", "Thunder Plate",
  "Wyrmscale Armor", "Elemental Armor", "Thornmail", "Void Plate", "Nightwarden", "Celestial Robes", "Ebonsteel Armor", "Runed Armor", "Shadowbound Cloak", "Silvered Plate",
  "Radiant Armor", "Arcane Barrier", "Crystal Plate", "Necroplate", "Bloodforged Armor", "Flameguard", "Lightshield", "Blightmail", "Shroud of Night", "Fiendish Plate",
  "Stormbreaker Armor", "Gleaming Armor", "Stoneplate", "Mystic Ward", "Lightforged Armor", "Moonlight Cloak", "Spectral Vestments", "Starbound Mail", "Frostmail", "Demonhide",
  "Golden Plate", "Ironbark Armor", "Voidwoven Armor", "Shadowhide", "Valkyrie Guard", "Sentinel's Plate", "Embercloak", "Cursed Armor", "Frostward", "Eldritch Mail",
  "Doomplate", "Titan's Guard", "Ebonhide", "Cleansing Vestments", "Druidic Armor", "Dragonscale Armor", "Gladiator's Plate", "Sunforged Armor", "Obsidian Guard", "Graveplate",
  "Moonsteel Armor", "Wraithhide", "Heavensguard", "Spectral Plate", "Infernal Armor", "Voidshroud", "Hellfire Plate", "Stoneguard", "Shimmering Armor", "Abyssal Plate",
  "Darksoul Armor", "Warden's Cloak", "Ethermail", "Skysteel Armor", "Wolfsbane Armor", "Bloodthorn Armor", "Grimplate", "Stalwart Plate", "Astral Mail", "Divine Plate"];
  const weaponTypes = [
  "Broadsword", "Longbow", "Warhammer", "Dagger", "Rapier", "Greatsword", "Crossbow", "Mace", "Axe", "Scythe",
  "Spear", "Halberd", "Flail", "Shortsword", "Claymore", "Katana", "Saber", "Morningstar", "Trident", "Staff",
  "Polearm", "Greataxe", "Falchion", "Battleaxe", "Scimitar", "Whip", "Throwing Knife", "Longsword", "Shortbow", "Lance",
  "Nunchaku", "Kusarigama", "Blunderbuss", "Recurve Bow", "Crossblade", "Warpick", "Shuriken", "Boomerang", "Javelin", "Maul",
  "Quarterstaff", "Khopesh", "Estoc", "Pike", "Throwing Spear", "War Club", "Tanto", "Zweihander", "Glaive", "Chakram",
  "Dirk", "Bastard Sword", "Sabre", "Nodachi", "Tonfa", "Naginata", "Bladespear", "Hand Cannon", "Repeater Crossbow", "War Pike",
  "Dragonfang", "Icebrand", "Soulblade", "Infernal Scythe", "Void Reaver", "Frostbite", "Stormbreaker", "Starshard", "Celestial Edge", "Darkfang",
  "Wyrmslayer", "Lightbringer", "Blood Reaver", "Demonblade", "Ghostsaber", "Emberblade", "Sunstrike", "Hellfire Axe", "Dread Mace", "Spectral Bow",
  "Shadowblade", "Arcane Scepter", "Frosthammer", "Venomspike", "Voidfire Staff", "Ironclaw", "Wraith Blade", "Soulpiercer", "Night Reaver", "Divine Edge",
  "Doomspear", "Phoenix Claw", "Firebrand", "Obsidian Blade", "Thunderstrike", "Rift Reaver", "Blightfang", "Windrazor", "Starbane", "Ebonflame"];
	const accessoryTypes = [
  "Amulet", "Ring", "Talisman", "Pendant", "Brooch", "Charm", "Bracelet", "Necklace", "Earring", "Belt",
  "Cloak", "Cape", "Mantle", "Medallion", "Girdle", "Circlet", "Diadem", "Choker", "Veil", "Shawl",
  "Locket", "Bauble", "Gleamstone", "Relic", "Totem", "Sash", "Coronet", "Crown", "Mask", "Gloves",
  "Wristlet", "Vambrace", "Band", "Armlet", "Tiara", "Headdress", "Orb", "Rune", "Sigil", "Seal",
  "Torc", "Cincture", "Chain", "Scarf", "Scepter", "Rod", "Phylactery", "Ringlet", "Collar", "Headband",
  "Anklet", "Key", "Scroll", "Emblem", "Medal", "Token", "Charmstone", "Sceptre", "Trinket", "Sundial",
  "Crystal", "Stone", "Tablet", "Glyph", "Sigilstone", "Banner", "Aegis", "Vial", "Lantern", "Ward",
  "Scabbard", "Tome", "Grimoire", "Horn", "Bell", "Sunstone", "Moonstone", "Starstone", "Runestone", "Mirror",
  "Hourglass", "Lamp", "Telescope", "Compass", "Vial of Essence", "Feather", "Flamebrand", "Emerald Sigil", "Ruby Amulet", "Wand of Light",
  "Orb of Shadows", "Candle", "Chalice", "Elixir", "Bracelet of Stars", "Ring of the Sun", "Gleaming Band", "Glowing Pendant", "Soul Ring", "Charmed Cloak"];
  if (type) {
	  if (type == "armor") {
		  return choose(mysticalNames)+", " + choose(armorTypes) + " " + choose(suffixes);
	  }
	  if (type == "accessory") {
		  return choose(mysticalNames)+", " + choose(accessoryTypes) + " " + choose(suffixes);
	  }
	  if (type == "weapon") {
		  return choose(mysticalNames)+", " + choose(weaponTypes) + " " + choose(suffixes);
	  }
  }
}


//SAVE&LOAD&RESET V.2
function saveGame () {
	let savedPlayer = player;
	savedPlayer = JSON.stringify(savedPlayer);
	localStorage.setItem('SaveData',savedPlayer)
	console.log("saved")
}

function loadGame () {
	let retrievedPlayer = localStorage.getItem('SaveData');
	if (!retrievedPlayer) {
		return;
	}
	retrievedPlayer = JSON.parse(retrievedPlayer);
	player = new Player(retrievedPlayer.x, retrievedPlayer.y, retrievedPlayer.speed, retrievedPlayer.attack, retrievedPlayer.defense, retrievedPlayer.hp, retrievedPlayer.maxHp);
	player.inventory = retrievedPlayer.inventory;
	player.equipmentSlots = retrievedPlayer.equipmentSlots;
	player.currency = retrievedPlayer.currency;
	player.upgrade = retrievedPlayer.upgrade;
	resetPlayer();
	updateUI();
}

function clearSave() {
	localStorage.clear();
    location.reload();   
}

// Function to update the upgrade buttons display with tooltips
function updateUpgradeDisplay() {
    const upgradeButtons = document.querySelectorAll('.upgrade-button');

    // Create a single tooltip element (reused for all buttons)
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.style.position = 'absolute';
        tooltip.style.display = 'none'; // Initially hide the tooltip
        document.body.appendChild(tooltip); // Append the tooltip to the body
    }

    // Define upgrade information
    const upgrades = {
        'strengthUpgrade': {
            name: 'Strength',
            description: 'Strengthen your body, allowing you to utilize more power.',
            effect: 'Multiply your damage by ' + beautify(player.upgrade['attack']/10+1),
			cost: getCost('attack'),
        },
        'toughnessUpgrade': {
            name: 'Toughness',
            description: 'Toughen your skin, allowing you to take more damage for less.',
            effect: 'Multiply your defense by ' + beautify(player.upgrade['defense']/10+1),
			cost: getCost('defense'),
        },
        'vitalityUpgrade': {
            name: 'Vitality',
            description: 'Vitalize your frame, allowing you to withstand more damage.',
            effect: 'Multiply your maxHp by ' + beautify(player.upgrade['hp']/10+1),
			cost: getCost('hp'),
        }
    };

    // Loop through all upgrade buttons and add event listeners
    upgradeButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            const upgradeId = this.id;
            const upgrade = upgrades[upgradeId];

            tooltip.style.display = 'block';
            tooltip.innerHTML = `
                <strong>${upgrade.name}</strong><br>
                Description: ${upgrade.description}<br>
                Effect: ${upgrade.effect} <br>
				Cost: ${upgrade.cost} Spirit Shards
            `;
        });

        button.addEventListener('mousemove', function(e) {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let left = e.pageX + 10;
            let top = e.pageY + 10;

            if (left + tooltipWidth > windowWidth) {
                left = windowWidth - tooltipWidth - 10;
            }
            if (top + tooltipHeight > windowHeight) {
                top = windowHeight - tooltipHeight - 10;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });

        button.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });
    });
}
