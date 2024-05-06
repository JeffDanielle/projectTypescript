// autobind decorator
// _ is an optional parameter which is okay to not be use
// function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//     console.log(descriptor);
//     const originalMethod = descriptor.value;
//     const adjDescriptor: PropertyDescriptor = {
//         configurable: true,
//         get() {
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         },
//     };
//     return adjDescriptor;
// }
// ProjectInput Class
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        // adds the id to the element
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    // @autobind
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    };
    return ProjectInput;
}());
var prjInput = new ProjectInput();
