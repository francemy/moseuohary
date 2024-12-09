

const ENVIRONMENT = {}

function createOrSelectElement(id = null, className = '', type = 'div') {
    if (!id) {
        const componentName = "createOrSelectElement";
        if (ENVIRONMENT[componentName]) {
            ENVIRONMENT[componentName] += 1;
        } else {
            ENVIRONMENT[componentName] = 1;
        }
        id = ENVIRONMENT[componentName];
    }

    const element = document.getElementById(id) || document.createElement(type);
    if (!element.id) element.id = 'createOrSelectElement-'+id;
    if (!element.className) element.className = className;
    return element;
}

export { ENVIRONMENT,createOrSelectElement }