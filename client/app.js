var app = new Vue({
    el: '#app',
    data: {
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
            console.log('close me');
        }

        

    },
    created: function() {
        console.log('created app');
    }
});