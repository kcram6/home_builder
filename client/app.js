var createUser = (user) => {
    let data = `registerName=${encodeURIComponent(user.registerName)}`;
    data += `&age=${encodeURIComponent(user.registerEmail)}`;
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
};

var getUser = () => {
    return fetch("http://localhost:8080/users");
}

var getPlan = () => {
    return fetch('http://localhost:8080/plans')
}


var app = new Vue({
    el: '#app',
    data: {

        sidingOptions: ["siding1.png", "siding2.png"],
        extDoorOptions: ["exDoor1.jpg", "exdoor2.jpg", "exdoor3.png"],
        intDoorOptions: ["intdoor1.jpg", "intdoor2.png", "intdoor3.png"],
        flooringOptions: ["floor1.png", "floor2.png", "floor3.png"],
        countertopOptions: ["counter1.png", "counter2.jpg", "counter3.jpg", "counter4.jpg"],

        showLandingPage: true,
        showRegisterPage: false,
        showSignInPage: false,
        showChoosePlan: false,
        showUserBase: false,


        //form inputs
        registerName: '',
        registerEmail:'',
        signInEmail: '',
        

        //data structures
        plans : [],
        erorrs: [],
        users: [],

        //plan attributes
        planName: '',
        pickedExtDoor:'',
        pickedExtDoorLink:'',
        pickedIntDoor: '',
        pickedSiding:'',
        pickedFlooring:'',
        pickedCounter:'',
    },
    methods: {

        
        
        addPlan: function() {
            console.log('button clicked');
        },

        showRegister: function() {
            this.registerEmail = '';
            this.registerName = '';
            this.signInEmail = '';
            this.showLandingPage = false;
            this.showRegisterPage = true;
            this.showSignInPage = false;
            this.showUserBase = false;
            this.showChoosePlan = false;
            console.log('register clicked');
        },

        showSignIn: function() {
            this.registerEmail = '';
            this.registerName = '';
            this.signInEmail = '';
            this.showSignInPage = true;
            this.showLandingPage = false;
            this.showRegisterPage = false;
            this.showChoosePlan = false;
            this.showUserBase = false;
            console.log('sign in clicked');
        },

        registerButtonClicked: function() {
            this.showRegisterPage = false;
            this.showSignInPage = true;
            this.showUserBase = false;
            this.showChoosePlan = false;
            this.showLandingPage = false;
            console.log('you registered now sign in');
            console.log(this.registerName + " " + this.registerEmail);
        },

        signInButtonClicked: function() {
            this.showRegisterPage = false;
            this.showSignInPage = false;
            this.showUserBase = true;
            this.showChoosePlan = false;
            this.showLandingPage = false;
            console.log('you signed in now');
            console.log(this.signInEmail, "sign in email");
        },

        newPlanButtonClicked: function() {
            this.planName = '';
            this.showRegisterPage = false;
            this.showSignInPage = false;
            this.showUserBase = false;
            this.showChoosePlan = true;
            this.showLandingPage = false;
            console.log('make a new plan');
            
        },

        closePlanButton: function() {
            this.showRegisterPage = false;
            this.showSignInPage = false;
            this.showUserBase = true;
            this.showChoosePlan = false;
            this.showLandingPage = false;
            this.pickedExtDoor = '';
            this.pickedIntDoor = '';
            this.pickedSiding = '';
            this.pickedFlooring = '';
            this.pickedCounter = '';
            console.log('close me');
            
        }

        

    },
    created: function() {
        console.log('created app');
    }
});