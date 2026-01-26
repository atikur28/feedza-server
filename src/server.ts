import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 5028;

async function main() {
  try {
    await prisma.$connect();

    console.log("Connected to database successfully!");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("An error occurred: ", error);
    process.exit(1);
  }
}

main();
