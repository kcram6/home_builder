var app = new Vue({
    el: '#app',
    data: {
        showLandingPage: true,
        showRegisterPage: false,
        showSignInPage: false,
        showChoosePlan: false,
        showUserBase: false,
        
        plans : [
        ]
    },
    methods: {
        addPlan: function() {
            console.log('button clicked');
        }

        // registerClicked: function() {
        //     landingRegisterButton = true;
        //     console.log('register clicked');
        // },

        // signInClicked: function() {
        //     landingSignInButton = true;
        //     console.log('sign in clicked');
        // }
    },
    created: function() {
        console.log('created app');
    }
});