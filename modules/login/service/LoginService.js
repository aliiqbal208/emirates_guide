(function(){


	angular.module('LoginModule')
.service('LoginService', LoginService);

LoginService.$inject = ['HttpService', '$q'];

function LoginService(HttpService, $q){

	function reset_password(email){

		var deffered = $q.defer();
		HttpService.Post("forgotPassword", {"email":email}).then(function(data){deffered.resolve(data);}, function(err){deffered.reject(err);})

		return deffered.promise;

	}

	function attempt(cred){

		var deffered = $q.defer();
		HttpService.Post("login", cred).then(function(data){deffered.resolve(data);}, function(err){deffered.reject(err);})

		return deffered.promise;

	}

	function login(user_obj){

		sessionStorage.current_user = JSON.stringify(user_obj);

	}

	function get_current_user(){

		return (sessionStorage.current_user)?JSON.parse(sessionStorage.current_user) : {};

	}

return{
	ResetPassword: reset_password,
	Attempt: attempt,
	Login: login,
	GetCurrentUser: get_current_user

}		


}

})();