-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_instructions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cookTime" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "instructions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_instructions" ("description", "id", "recipeId", "stepNumber") SELECT "description", "id", "recipeId", "stepNumber" FROM "instructions";
DROP TABLE "instructions";
ALTER TABLE "new_instructions" RENAME TO "instructions";
CREATE INDEX "instructions_recipeId_idx" ON "instructions"("recipeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
