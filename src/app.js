// Project State Management
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,
        };
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
function validate(validatableInput) {
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength !== undefined && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength !== undefined && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min !== undefined && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.min;
    }
    if (validatableInput.max !== undefined && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.max;
    }
    return isValid;
}
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
// ProjectList Class
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        this.assignedProjects = [];
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        // adds the id to the element
        this.element.id = "".concat(this.type, "-projects");
        projectState.addListener(function (projects) {
            _this.assignedProjects = projects;
            _this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById("".concat(this.type, "-projects-list"));
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl === null || listEl === void 0 ? void 0 : listEl.append(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = "".concat(this.type, "-projects-list");
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = "".concat(this.type.toUpperCase(), " PROJECTS");
    };
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    };
    return ProjectList;
}());
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
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        var descriptionValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 5,
        };
        var peopleValidatable = {
            value: enteredTitle,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    };
    // @autobind
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
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
var activePrjList = new ProjectList("active");
var finishedPrjList = new ProjectList("finished");
