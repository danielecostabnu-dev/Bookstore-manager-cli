import { MainMenu } from "./menus/MainMenu.js";
async function main () {
    const menu = new MainMenu();

    await menu.exibir();

}

main();