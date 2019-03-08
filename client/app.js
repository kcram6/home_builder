
var createUser = (user) => {
    let data = `registerName=${encodeURIComponent(user.registerName)}`;
    data += `&registerEmail=${encodeURIComponent(user.registerEmail)}`;
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    });
};

var createPlan = (plan) => {
    let data = `planName=${encodeURIComponent(plan.planName)}`
    data += `&pickedExtDoor=${encodeURIComponent(plan.pickedExtDoor)}`;
    data += `&pickedIntDoor=${encodeURIComponent(plan.pickedIntDoor)}`;
    data += `&pickedExtSiding=${encodeURIComponent(plan.pickedExtSiding)}`;
    data += `&pickedFlooring=${encodeURIComponent(plan.pickedFlooring)}`;
    data += `&pickedCountertop=${encodeURIComponent(plan.pickedCountertop)}`;
    data += `&planDate=${encodeURIComponent(plan.planDate)}`;
    return fetch('http://localhost:8080/plans', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, 
        body: data
    }).then(function (res) {
        if (res.status == 201) {
            console.log('ok');
            this.pickedCountertop = '';
            this.pickedExtDoor = '';
            this.pickedIntDoor = '';
            this.pickedFlooring = '';
            this.pickedExtSiding = '';
            this.planName = '';
            this.closePlanButton();
            this.loadPlans();

        } else {
            alert('problem');
        }
    });
};



var getUser = () => {
    return fetch("http://localhost:8080/users");
}

var getPlans = () => {
    return fetch('http://localhost:8080/plans')
}





var app = new Vue({
    el: '#app',
    data: {
        sidingOptions: ["images/siding1.png", "images/siding2.png"],
        extDoorOptions: ["images/exDoor1.jpg", "images/exdoor2.jpg", "images/exdoor3.png"],
        intDoorOptions: ["images/intdoor1.jpg", "images/intdoor2.png", "images/intdoor3.png"],
        flooringOptions: ["images/floor1.png", "images/floor2.png", "images/floor3.png"],
        countertopOptions: ["images/counter1.png", "images/counter2.jpg", "images/counter3.jpg", "images/counter4.jpg"],
    
        showLandingPage: true,
        showRegisterPage: false,
        showSignInPage: false,
        showChoosePlan: false,
        showUserBase: false,
    
    
        //form inputs
        registerName: '',
        registerEmail:'',
        signInEmail: '',
    
        //css
        selectedRadio:false,
        
    
        //data structures
        plans : [],
        users: [],
    
        nameErrors: [],
        extDoorErrors: [],
        intDoorErrors: [],
        extSidingErrors: [],
        flooringErrors: [],
        countertopErrors: [],
    
    
        //plan attributes
        planName: '',
        planDate:'',
        pickedExtDoor:'',
        pickedExtDoorLink:'',
        pickedIntDoor: '',
        pickedExtSiding:'',
        pickedFlooring:'',
        pickedCountertop:'',

    },
    watch: {

        // date(val) {
        //   if (val !== '')
        //     this.date = this.date
        //   },
        // name(val) {
        //   if (val !== '')
        //     this.valid.amount = this.validName()
        //     },
        // email(val) {
        //   if (val !== '')
        //     this.valid.email = this.validEmail()
        // },
        // phone(val) {
        //   if (val !== '')
        //     this.valid.phone = this.validPhone()
        //   },
    },
    methods: {
        validatePlan: function() {
            this.nameErrors = [];
            this.extDoorErrors = [];
            this.intDoorErrors = [];
            this.extSidingErrors = [];
            this.flooringErrors = [];
            this.countertopErrors = [];
            if (this.planName == "") {
                this.nameErrors.push("You must specify a plan name.");
            }
            if (this.pickedExtDoor == "") {
                this.extDoorErrors.push("You must choose an exterior door.");
            }
            if (this.pickedIntDoor == "") {
                this.intDoorErrors.push("You must choose an interior door.");
            }
            if (this.pickedExtSiding == "") {
                this.extSidingErrors.push("You must choose a siding option.");
            } 
            if (this.pickedFlooring == "") {
                this.flooringErrors.push("You must choose a flooring option.");
            }
            if (this.pickedCountertop == "") {
                this.countertopErrors.push("You must choose a countertop option.");
            }
        },

    

        validPlanName() {
            return this.planName !== '' && this.planName.length <= 30;
        },

        validExtDoor() {
            return this.pickedExtDoor;
        },

        validIntDoor() {
            return this.pickedIntDoor;
        },

        validExtSiding() {
            return this.pickedExtSiding;
        },

        validFlooring() {
            return this.pickedFlooring;
        },
        validCountertop() {
            return this.pickedCountertop;
        },

        validEmail() {
            return this.registerEmail !== '' && /.+@.+/.test(this.registerEmail) 
        },

    
        addPlan: function() {
            this.validatePlan();
            if (this.nameErrors.length || this.extDoorErrors.length || this.intDoorErrors.length || this.extSidingErrors.length || this.flooringErrors.length || this.countertopErrors.length) {
                return;
            }
            createPlan({
                planName: this.planName,
                pickedExtDoor: this.pickedExtDoor,
                pickedIntDoor: this.pickedIntDoor,
                pickedExtSiding: this.pickedExtSiding,
                pickedFlooring: this.pickedFlooring,
                pickedCountertop: this.pickedCountertop,
                planDate: Date.now()
            }).then(res => {
                this.loadPlans();
                console.log('plan created');
                console.log(this.planDate)
            })
            
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
            this.pickedExtSiding = '';
            this.pickedFlooring = '';
            this.pickedCountertop = '';
            console.log('close me');
            
        },
        loadPlans:  function() {
            getPlans().then(res => {
                res.json().then(data => {
                    this.plans = data;
                })
            });
        }

        

    },
    created: function() {
        console.log('created app');
        this.loadPlans();
        console.log('after loading plans');
        
    }
});