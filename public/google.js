var auth;

window.gapi.load('client:auth2', ()=>{
    window.gapi.client.init({
        clientId: '483980907306-p3rddblab189gcf77b4bemojmlt487jj.apps.googleusercontent.com',
        scope: 'email'
    }).then(()=> {
        auth = window.gapi.auth2.getAuthInstance();
        auth.isSignedIn.listen(onAuthChange);
    });
});

onAuthChange= (isSignedIn)=>{

    const google= auth.currentUser.get().Qt;
    if(isSignedIn){
        console.log(auth);
        $.ajax({
            url: '/login-with-google',
            headers:{
                'head-token': head
            },
            data: {
                name: google.Ad,
                userID: google.SU,
                gmail: google.zu
            },
            method: 'POST',
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        });
    }
    else
        alert(`${google.Ad} is signed out`);
}

onSignInClick= ()=> {

    if(auth.isSignedIn.get())
        return alert(`${auth.currentUser.get().Qt.Ad} is already connected.. First Sign him Out`);

    auth.signIn();
}

onSignOutClick= ()=> {
    if(!auth.isSignedIn.get())
        alert('No connected User')

    this.auth.signOut();
}
