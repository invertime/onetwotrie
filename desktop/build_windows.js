const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './release-builds/onetwotrie-win32-ia32');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: 'OneTwoTrie, et un pas de plus vers l\'écologie',
    exe: 'OneTwoTrie',
    name: 'OneTwoTrie',
    manufacturer: 'Collège Albert Calmette',
    version: '12.08.2020',
    shortcutName: 'OneTwoTrie',

    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function(){
    msiCreator.compile();
});
