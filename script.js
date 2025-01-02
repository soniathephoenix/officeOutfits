// Define the officeOutfits array
const officeOutfits = [
    { bottoms: "burgundy pants", top1: "white shirt", top2: "black jumper", shoes: "white sneakers" },
    { bottoms: "burgundy pants", top1: "white t-shirt", top2: "grey blazer", shoes: "white sneakers" },
    { bottoms: "burgundy pants", top1: "blue shirt", top2: "black jumper", shoes: "white sneakers" },
    { bottoms: "burgundy pants", top1: "blue shirt", top2: "grey blazer", shoes: "white sneakers" },
    { bottoms: "Camel pants", top1: "blue shirt", top2: "blue zip jacket", shoes: "white sneakers" },
    { bottoms: "Camel pants", top1: "blue shirt", top2: "blue cardigan", shoes: "white sneakers" },
    { bottoms: "Black pants", top1: "turtle neck", top2: "-", shoes: "white sneakers" },
    { bottoms: "Black pants", top1: "turtle neck", top2: "-", shoes: "black shoes" },
    { bottoms: "Black pants", top1: "white shirt", top2: "grey jacket", shoes: "black shoes" },
    { bottoms: "Black pants", top1: "white shirt", top2: "black jumper", shoes: "white sneakers" },
    { bottoms: "Black pants", top1: "black t-shirt", top2: "white jacket", shoes: "white sneakers" },
    { bottoms: "Black pants", top1: "white shirt", top2: "black jumper", shoes: "black shoes" },
    { bottoms: "Jeans", top1: "white t-shirt", top2: "grey jacket", shoes: "white sneakers" },
    { bottoms: "Jeans", top1: "red top", top2: "-", shoes: "black shoes" },
    { bottoms: "Jeans", top1: "white shirt", top2: "black jumper", shoes: "burgundy boots" },
    { bottoms: "Green pants", top1: "white shirt", top2: "black jumper", shoes: "black shoes" },
    { bottoms: "Green pants", top1: "turtle neck", top2: "-", shoes: "black shoes" },
];

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate unique outfits
function generateUniqueOutfits(outfits, numberOfOutfits) {
    let attempts = 0; // Track the number of attempts
    while (attempts < 10) { // Retry up to 10 times to ensure 5 unique outfits
        const shuffledOutfits = shuffleArray([...outfits]);
        const selectedOutfits = [];
        const usedItems = { bottoms: new Set(), top1: new Set() };

        for (let i = 0; i < shuffledOutfits.length && selectedOutfits.length < numberOfOutfits; i++) {
            const outfit = shuffledOutfits[i];
            if (
                !usedItems.bottoms.has(outfit.bottoms) &&
                !usedItems.top1.has(outfit.top1)
            ) {
                selectedOutfits.push(outfit);
                usedItems.bottoms.add(outfit.bottoms);
                usedItems.top1.add(outfit.top1);
            }
        }

        if (selectedOutfits.length === numberOfOutfits) {
            return selectedOutfits;
        }
        attempts++;
    }
    throw new Error("Unable to generate 5 unique outfits. Please try again.");
}

// DOM Manipulation
document.getElementById("generate-outfits").addEventListener("click", () => {
    const outfitList = document.getElementById("outfit-list");
    outfitList.innerHTML = ""; // Clear previous results

    try {
        const uniqueOutfits = generateUniqueOutfits(officeOutfits, 5);
        uniqueOutfits.forEach((outfit, index) => {
            const outfitCard = document.createElement("div");
            outfitCard.className = "outfit-card";
            outfitCard.innerHTML = `
                <h2>Outfit ${index + 1}</h2>
                <p><span>Bottoms:</span> ${outfit.bottoms}</p>
                <p><span>Top 1:</span> ${outfit.top1}</p>
                <p><span>Top 2:</span> ${outfit.top2}</p>
                <p><span>Shoes:</span> ${outfit.shoes}</p>
            `;
            outfitList.appendChild(outfitCard);
        });
    } catch (error) {
        outfitList.innerHTML = `<p>${error.message}</p>`;
    }
});
