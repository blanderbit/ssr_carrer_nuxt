const Cookie = require('js-cookie')

export default function ({ $axios, app }) {
  const accessToken = Cookie.get('token')
  
  $axios.setHeader('Private-Key', process.env.PrivateKey)
  $axios.setHeader('Public-Key', process.env.PublicKey)
  $axios.setToken(accessToken, 'Bearer')

  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })

  $axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.status === 405) {
      app.store.dispatch('snackbar', {text: error.response.data.errors[0], color: 'error'})
    }
    if (error.response.status === 400 && error.response.data.error === 'token_not_provided') {
      app.store.dispatch('snackbar', {text: error.response.data.error, color: 'error'})
      $axios.put(`/token`).then(response => {
        // console.log(response.data)
      }).catch(() => {
        // app.store.dispath('logout')
        app.router.push('/');
      })
    }

    return Promise.reject(error)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    let originalRequest = error.config;
    console.log('status' + code)
    // console.log('error' + error.response)
    // console.log(app)
    // let token = app.$cookies.get('token');
    // app.router.push('/login');
    // console.log('token' + app.$cookies.get('token'))
    if (code === 401) {
      app.store.dispatch('snackbar', {text: error.response.data.errors.error, color: 'error'})
      originalRequest.__isRetryRequest = true;
      return new Promise((resolve, reject) => {
        let req = $axios
          .put(`/token`)
          .then(response => {
            const newtoken = response.data.data.token
            // console.log(response.data.data.token)
            if (response.status == 200) {
              // app.store.state.dispath('logout')
              // console.log('response.status 200')
              // console.log(app.store.state.loginModal)
                // app.$cookies.set('access', response.data.access_token);
                app.$cookies.set('token', newtoken);
                originalRequest.headers['Authorization'] = `Bearer ${
                  newtoken
                }`;
            }
            resolve(response);
          }).catch(e => {
            reject("some message");
          })

        })
        .then(res => {
          console.log(777)
          return $axios(originalRequest);
        }).catch(e => {
          app.router.push('/');
        });
    }


    if (code === 400) {
      // redirect('/400')
    }
    // if (code === 401) {
    //   console.log('faild auth')
    //   Cookie.remove('auth')
    //   Cookie.remove('token')
    // }
  })
}