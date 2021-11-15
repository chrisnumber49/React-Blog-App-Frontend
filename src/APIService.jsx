class APIService {

  static InsertPost(body, token) {
    return fetch('http://127.0.0.1:8000/api/posts/', {
      'method':'POST',
      headers: {
          'Authorization':`Token ${token}` 
      }, 
      body:body
    }).then(resp => resp.json())
  }

  static PartialUpdatePost(post_id, body, token) {
    return fetch(`http://127.0.0.1:8000/api/posts/${post_id}/`, {
      'method':'PATCH',
      headers: {
          'Authorization':`Token ${token}` 
      }, 
      body:body
    }).then(resp => resp.json())
  }

  static DeletePost(post_id, token) {
    return fetch(`http://127.0.0.1:8000/api/posts/${post_id}/`, {
      'method':'DELETE',
      headers: {
          'Authorization':`Token ${token}` 
      }
    })
  }

  static InsertComment(body, token) {
    return fetch('http://127.0.0.1:8000/api/comments/', {
      'method':'POST',
      headers: {
          'Authorization':`Token ${token}` 
      }, 
      body:body
    }).then(resp => resp.json())
  }

  static DeleteComment(post_id, token) {
    return fetch(`http://127.0.0.1:8000/api/comments/${post_id}/`, {
      'method':'DELETE',
      headers: {
          'Authorization':`Token ${token}` 
      }
    })
  }

  static LoginUser(body) {
    return fetch('http://127.0.0.1:8000/auth/', {
      'method':'POST',
      headers: {
          'Content-Type':'application/json',
      }, 
      body:JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static RegisterUser(body) {
    return fetch('http://127.0.0.1:8000/api/users/', {
      'method':'POST',
      headers: {
          'Content-Type':'application/json',
      }, 
      body:JSON.stringify(body)
    }).then(resp => resp.json())
  }
    
}

export default APIService;