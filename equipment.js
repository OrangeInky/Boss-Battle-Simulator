class Equipment {
    constructor(rarity, tier, level) {
        this.rarity = rarity; // Rarity (Common, Rare, Epic, Legendary)
        this.tier = tier;     // Tier (1, 2, 3...)
        this.level = level;   // Equipment Level
		
		//Types (Armor, Weapon, Accessory)
		this.type = '';
		this.generateType();
		
        // Equipment stats (initialized to 0, will be generated later)
        this.attackBuff = 0;
        this.defenseBuff = 0;
        this.hpBuff = 0;
		
		// Names
		this.name = "";
		this.generateName();

        // Generate the final buffs based on rarity and tier
        this.generateStats();
    }

    // Random function to generate buffs based on rarity and tier
    generateStats() {
        // Define stat multiplier based on rarity
        const rarityMultiplier = {
            Common: 1,
            Rare: 1.5,
            Epic: 2,
            Legendary: 3
        };

        // Random base values (vary depending on tier and rarity)
        const baseAttack = this.getRandomInt(5, 15) * this.tier;
        const baseDefense = this.getRandomInt(3, 10) * this.tier;
        const baseHp = this.getRandomInt(10, 30) * this.tier;

        // Apply rarity multiplier to stats
        this.attackBuff = baseAttack * rarityMultiplier[this.rarity];
        this.defenseBuff = baseDefense * rarityMultiplier[this.rarity];
        this.hpBuff = baseHp * rarityMultiplier[this.rarity];

        // Optionally, scale buffs by level
        this.attackBuff *= 1 + (this.level * 0.05);
        this.defenseBuff *= 1 + (this.level * 0.05);
        this.hpBuff *= 1 + (this.level * 0.05);
    }
	
	generateType() {
		const types = ['weapon','armor','accessory'];
		this.type = choose(types);
	}
	
	generateName() {
		this.name = cosmeticEquipmentNames(this.type);
	}

    // Helper function to get a random integer between a range
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


// Player Class
class Player {
    constructor(x, y, speed, attack, defense, hp, maxHp) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.maxHp = maxHp;
		this.currency = 0;
		this.upgrade = {
			attack: 0,
			defense: 0,
			hp: 0,
		}

        // Inventory to store all collected equipment
        this.inventory = [];

        // Equipment slots (weapon, armor, accessory)
        this.equipmentSlots = {
            weapon: null,
            armor: null,
            accessory: null
        };
    }

    // Add item to inventory
    addItemToInventory(equipment) {
        if (this.inventory.length < 16) {
            this.inventory.push(equipment);
            this.updateEquipmentDisplay();
        } else {
            console.log('Inventory is full!');
        }
    }
	deleteItemFromInventory(index) {
		const gear = this.inventory[index];
		const gearType = this.inventory[index].type
		if (gear) {
			if (this.equipmentSlots[gearType] == gear) {
				this.unequipItem(gearType);
			}
			this.inventory.splice(index,1);
			updateUI();
		}
	}

    // Equip an item to the corresponding slot
    equipItem(equipment) {
		if (!equipment) {}
        const slot = equipment.type; // Get equipment type (e.g., 'weapon', 'armor')
        if (!this.equipmentSlots[slot]) {
            // Equip item and apply buffs
            this.equipmentSlots[slot] = equipment;
            this.applyBuffs(equipment);
        } else {
            this.unequipItem(slot)
			this.equipItem(equipment);
        }
		updateUI();
    }

    // Unequip an item from a specific slot
    unequipItem(slot) {
        const item = this.equipmentSlots[slot];
        if (item) {
            this.removeBuffs(item);
            this.equipmentSlots[slot] = null;
        }
    }

    // Apply buffs from equipment
    applyBuffs(equipment) {
        this.attack += equipment.attackBuff;
        this.defense += equipment.defenseBuff;
        this.maxHp += equipment.hpBuff;
        this.hp = Math.min(this.hp, this.maxHp);  // Make sure HP doesn't exceed new max HP
    }

    // Remove buffs when unequipping an item
    removeBuffs(equipment) {
        this.attack -= equipment.attackBuff;
        this.defense -= equipment.defenseBuff;
        this.maxHp -= equipment.hpBuff;
        this.hp = Math.min(this.hp, this.maxHp);
    }

    // Equip item by ID from inventory
    equipFromInventory(itemName) {
        const item = this.inventory.find(equip => equip.name === itemName);
        if (item) {
            this.equipItem(item);
        } else {
            console.log(`Item ${itemName} not found in inventory`);
        }
    }

    // Unequip item by slot
    unequipSlot(slot) {
        if (this.equipmentSlots[slot]) {
            this.unequipItem(slot);
        } else {
            console.log(`No item equipped in ${slot} slot`);
        }
    }
	
	// Function to update the equipment grid display
	updateEquipmentDisplay() {
		const equipmentGrid = document.getElementById('equipmentGrid');
		equipmentGrid.innerHTML = ''; // Clear the grid

		// Create a single tooltip element (reused for all items)
		let tooltip = document.querySelector('.tooltip');
		if (!tooltip) {
			tooltip = document.createElement('div');
			tooltip.classList.add('tooltip');
			tooltip.style.position = 'absolute';
			tooltip.style.display = 'none'; // Initially hide the tooltip
			document.body.appendChild(tooltip); // Append the tooltip to the body
		}

		// Loop through the 5x5 grid and display equipment or empty slots
		for (let i = 0; i < 25; i++) {
			const slot = document.createElement('div');
			slot.classList.add('equipmentSlot');

			if (this.inventory[i]) {
				const item = this.inventory[i];
				slot.textContent = item.name;

				// Add class based on rarity
				switch (item.rarity) {
					case 'Common':
						slot.classList.add('common');
						break;
					case 'Rare':
						slot.classList.add('rare');
						break;
					case 'Epic':
						slot.classList.add('epic');
						break;
					case 'Legendary':
						slot.classList.add('legendary');
						break;
				}

				// Check if the item is equipped and add the appropriate border class
				if (this.equipmentSlots[item.type] === item) {
					slot.classList.add('equipped');
				} else {
					slot.classList.add('unequipped');
				}

				// Add event listeners for showing and positioning the tooltip
				slot.addEventListener('mouseover', function() {
					tooltip.style.display = 'block';
					tooltip.innerHTML = `
						<strong>${item.name}</strong><br>
						Type: ${item.type}<br>
						Attack: ${item.attackBuff.toFixed(2)}<br>
						Defense: ${item.defenseBuff.toFixed(2)}<br>
						HP: ${item.hpBuff.toFixed(2)}<br>
						Rarity: ${item.rarity}<br>
						Tier: ${item.tier}<br>
						Level: ${item.level}
					`;
				});

				slot.addEventListener('mousemove', function(e) {
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

				slot.addEventListener('mouseout', function() {
					tooltip.style.display = 'none';
				});

				// Add onclick event to equip item
				slot.onclick = () => {
					this.equipItem(item);
					tooltip.style.display = 'none'; // Hide the tooltip when item is clicked
				};

				// Add event listener for shift-right-click to delete the item
				slot.addEventListener('contextmenu', (e) => {
					if (e.shiftKey) {
						e.preventDefault(); // Prevent the default right-click menu from showing
						this.deleteItemFromInventory(i); // Delete item from inventory
						tooltip.style.display = 'none'; // Remove the tooltip display.
					}
				});
			} else {
				slot.textContent = 'Empty';
			}

			equipmentGrid.appendChild(slot);
		}
	}
}