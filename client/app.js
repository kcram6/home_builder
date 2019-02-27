var app = new Vue({
    el: '#app',
    data: {
        showLandingPage: true,
        showRegisterPage: false,
        showSignInPage: false,
        showChoosePlan: false,
        showUserBase: false,
        

        
        plans : []
    },
    methods: {
        addPlan: function() {
            console.log('button clicked');
        },

        registerClicked: function() {
            this.showLandingPage = false;
            this.showRegisterPage = true;
            this.showSignInPage = false;
            this.showUserBase = false;
            this.showChoosePlan = false;
            console.log('register clicked');
        },

        signInClicked: function() {
            this.showSignInPage = true;
            this.showLandingPage = false;
            this.showRegisterPage = false;
            this.showChoosePlan = false;
            this.showUserBase = false;
            console.log('sign in clicked');
        }
    },
    created: function() {
        console.log('created app');
    }
});