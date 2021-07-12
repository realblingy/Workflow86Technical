interface dependencies {
    [key: string]: Array<string>,
}

interface foundDependencies {
    [key: string]: number | undefined,
}

interface visitedDependencies {
    [key: string]: 1 | undefined,
}

export class ModuleManager {
    dependencies: dependencies;
    dependenciesCounter: number;
    foundDependencies: foundDependencies;
    visitedDependencies: visitedDependencies;

    constructor(dependencies: dependencies) {
        this.dependencies = dependencies;
        this.dependenciesCounter = 0;
        this.foundDependencies = {}
        this.visitedDependencies = {};
    }

    setDependencies(dependencies: dependencies) {
        this.dependencies = dependencies;
    }

    incrementDependenciesCounter() {
        this.dependenciesCounter += 1;
    }

    reset() {
        this.dependenciesCounter = 0;
        this.foundDependencies = {};
        this.visitedDependencies = {};
    }

    findModuleDependencies(dependency: string) {
        this.reset();
        this.getModuleDependencies(dependency);
        console.log(Object.keys(this.foundDependencies));
        return Object.keys(this.foundDependencies);
    }

    getModuleDependencies(dependency: string) {
        // Detects loop in dependencies
        if (this.visitedDependencies[dependency] === undefined) {
            this.visitedDependencies[dependency] = 1;
        } else {
            throw new Error('Faulty dependencies');
        }

        // Checks if other dependencies needs to be found
        this.dependencies[dependency].forEach((d: string) => {
            // Checks if other dependency has not been found
            if (this.foundDependencies[d] === undefined) {
                // If the other dependency has no other dependencies
                // then add it to the dependency list
                // Otherwise find its other dependencies
                if (this.dependencies[d] === undefined) {
                    this.foundDependencies[d] = this.dependenciesCounter;
                    this.incrementDependenciesCounter();
                } else {
                    this.getModuleDependencies(d);
                }

                // If the current dependency hasn't already been added
                if (this.foundDependencies[d] === undefined) {
                    this.foundDependencies[d] = this.dependenciesCounter;
                    this.incrementDependenciesCounter();
                }
            }
        })

    }

}
