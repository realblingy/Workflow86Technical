import { ModuleManager } from './moduleManager';
import { modules } from './modules';

const moduleManager = new ModuleManager(modules[0]);

console.log("=========== Test 1 ===========")
// Test 1
moduleManager.findModuleDependencies('G');
moduleManager.findModuleDependencies('C');
moduleManager.findModuleDependencies('A');

console.log("=========== Test 2 ===========")
// Test 2
moduleManager.setDependencies(modules[1]);
moduleManager.findModuleDependencies('G')
moduleManager.findModuleDependencies('C');
moduleManager.findModuleDependencies('A');

console.log("=========== Test 3 ===========")
// Test 3
moduleManager.setDependencies(modules[2]);

try {
    moduleManager.findModuleDependencies('G');
} catch (error) {
    console.log('Error: faulty dependencies');
}

try {
    moduleManager.findModuleDependencies('C');
} catch(error) {
    console.log('Error: faulty dependencies');
}   

try {
    moduleManager.findModuleDependencies('A');
} catch(error) {
    console.log('Error: faulty dependencies');
}



// console.log(modules[1])

// moduleManager.getModuleDependencies('A');