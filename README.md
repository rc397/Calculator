# Worst Calculator Ever

Open `index.html`.

- Only supports addition: `a + b`
- `a` and `b` are limited to `[-100, 100]`
- If the sum goes outside `[-100, 100]`, it shows `err idk` and offers a `show me` button
- Some easter eggs
- Please understand that I fully commited to this being "the worst project ever" by writing out each possible equation i had time for.
-Below is just a small snapshot of it.
function manualAdd(aStr, bStr) {
  // Starting with the classics
  if (aStr === "1" && bStr === "1") return "2";
  if (aStr === "1" && bStr === "2") return "3";
  if (aStr === "1" && bStr === "3") return "4";
  if (aStr === "1" && bStr === "4") return "5";
  if (aStr === "1" && bStr === "5") return "6";
  if (aStr === "1" && bStr === "6") return "7";
  if (aStr === "1" && bStr === "7") return "8";
  if (aStr === "1" && bStr === "8") return "9";
  if (aStr === "1" && bStr === "9") return "10";
  if (aStr === "1" && bStr === "10") return "11";
  if (aStr === "2" && bStr === "1") return "3";
  if (aStr === "2" && bStr === "2") return "4";
  if (aStr === "2" && bStr === "3") return "5";
  if (aStr === "2" && bStr === "4") return "6";
  if (aStr === "2" && bStr === "5") return "7";
  if (aStr === "2" && bStr === "6") return "8";
  if (aStr === "2" && bStr === "7") return "9";
  if (aStr === "2" && bStr === "8") return "10";
  if (aStr === "2" && bStr === "9") return "11";
  if (aStr === "2" && bStr === "10") return "12";
  if (aStr === "3" && bStr === "1") return "4";
  if (aStr === "3" && bStr === "2") return "5";
  if (aStr === "3" && bStr === "3") return "6";
  if (aStr === "3" && bStr === "4") return "7";
  if (aStr === "3" && bStr === "5") return "8";
  if (aStr === "3" && bStr === "6") return "9";
  if (aStr === "3" && bStr === "7") return "10";
  if (aStr === "3" && bStr === "8") return "11";
  if (aStr === "3" && bStr === "9") return "12";
  if (aStr === "3" && bStr === "10") return "13";
  if (aStr === "4" && bStr === "1") return "5";
  if (aStr === "4" && bStr === "2") return "6";
  if (aStr === "4" && bStr === "3") return "7";
  if (aStr === "4" && bStr === "4") return "8";
  if (aStr === "4" && bStr === "5") return "9";
  if (aStr === "4" && bStr === "6") return "10";
  if (aStr === "4" && bStr === "7") return "11";
  if (aStr === "4" && bStr === "8") return "12";
  if (aStr === "4" && bStr === "9") return "13";
  if (aStr === "4" && bStr === "10") return "14";
  if (aStr === "5" && bStr === "1") return "6";
  if (aStr === "5" && bStr === "2") return "7";
  if (aStr === "5" && bStr === "3") return "8";
  if (aStr === "5" && bStr === "4") return "9";
