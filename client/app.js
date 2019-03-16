// import moment from './moment'

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
            this.showChoosePlan = false;
            

        } else {
            alert('problem');
        }
    });
};



var getUsers = () => {
    return fetch("http://localhost:8080/users");
};

var getPlans = () => {
    return fetch('http://localhost:8080/plans');
};

var deletePlan = (id) => {
    return fetch(`http://localhost:8080/plans/${id}`, {
        method: "DELETE",
    }).then(function(res) {
        if (res.status == 200) {
            app.loadPlans()
        } else {
            console.log('delete error')
        }
           
        
    })
};

var updatePlan = function (newPlan) {
    console.log("newPlan: ", app.currentId);
    let data = `planName=${encodeURIComponent(newPlan.planName)}`
    data += `&pickedExtDoor=${encodeURIComponent(newPlan.pickedExtDoor)}`;
    data += `&pickedIntDoor=${encodeURIComponent(newPlan.pickedIntDoor)}`;
    data += `&pickedExtSiding=${encodeURIComponent(newPlan.pickedExtSiding)}`;
    data += `&pickedFlooring=${encodeURIComponent(newPlan.pickedFlooring)}`;
    data += `&pickedCountertop=${encodeURIComponent(newPlan.pickedCountertop)}`;
    
    console.log("update str: ", data);

    fetch(`http://localhost:8080/plans/${app.currentId}`, {
            body: data,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
          if (res.status == 200) {
            app.loadPlans()
            console.log('plans should reload after update');
          } else {
            console.log("error from fetch");
          }
        });
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
        showEditPlan: false,
    
    
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

        //conditionals
        editMode: false,
        showDeleteModal: false,

        currentId: null,

    },
    watch: {
        // currentId() {
        //     console.log("current id: ", this.currentId);
        // },

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
        
        formatDate: function (date) {
            return moment(date).format("YYYY-MM-DD");
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
                pickedCountertop: this.pickedCountertop
            }).then(res => {
                this.showChoosePlan = false;
                this.showUserBase = true;
                this.loadPlans();
                console.log('plan created');
                console.log(this.planDate)
            })
            
        },

        showEditPlanOptions: function(plan) {
            this.pickedCountertop = plan.pickedCountertop;
            this.pickedExtDoor = plan.pickedExtDoor;
            this.pickedIntDoor = plan.pickedIntDoor;
            this.pickedFlooring = plan.pickedFlooring;
            this.pickedExtSiding = plan.pickedExtSiding;
            this.planName = plan.planName;
        },

        setCurrentId: function(plan) {
            this.currentId = plan._id;
        },

        editPlan: function(plan) {
            this.validatePlan();
            updatePlan({
                planName: this.planName,
                pickedExtDoor: this.pickedExtDoor,
                pickedIntDoor: this.pickedIntDoor,
                pickedExtSiding: this.pickedExtSiding,
                pickedFlooring: this.pickedFlooring,
                pickedCountertop: this.pickedCountertop
            
                
            })
            this.showEditPlan = false;
            this.showUserBase = true;
            

            // console.log("this is the plan ", plan);
            
            
        },

        deletePlan: function(plan) {
            this.currentId = plan._id;
            console.log("plan to delete kath....", plan);
            console.log(this.currentId)
            deletePlan(this.currentId);
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
            this.showEditPlan = false;
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