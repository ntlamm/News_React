import React, { useState, useEffect } from 'react'
import './App.css'
// import {Routes} from 'react-router-dom'

function ViewList({ content, setDelId, setId, setConfirm }) {
  return (
    <div className="col-md-4">
      <div className='container'>
        <button style={{ float: 'right' }} onClick={() => { setConfirm(true); setDelId(content.id) }}
          type="button" className="btn-close p-2" data-bs-dismiss="modal" aria-label="Close">
        </button>
        <div className="New shadow p-3 mb-5 bg-body rounded">
          <a href='' onClick={e => { e.preventDefault(); setId(content.id) }}>
            <div className="mb-2"><img alt='' src={content.thumbnailUrl} id="img" /></div>
            <h6 style={{ textAlign: 'left' }}>{content.title}</h6>
          </a>
          <p><i className="bi bi-calendar"></i> {content.modifiedDate}</p>
        </div>
      </div>
    </div>
  )
}

function Form({ setShowForm }) {

  return (
    <div className='modal'>
      <div id='add-new-modal' className='p-1'>
        <button style={{ float: 'right' }} onClick={() => setShowForm(false)}
          type="button" className="btn-close p-2" data-bs-dismiss="modal" aria-label="Close">
        </button>
        <form className='container'>
          <div className='container p-3'>
            <h4><strong>Tạo bài viết</strong></h4>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Chủ đề</label>
              <textarea className="form-control" id="exampleInputEmail1"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">URL</label>
              <input type="text" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Nội dung</label>
              <textarea className="form-control" id="content"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="source" className="form-label">Nguồn</label>
              <input type="text" className="form-control" id="source" />
            </div>
            <div className='text-center'>
              <button style={{ marginRight: 10 }} type="button" 
              onClick={() => {setShowForm(false); }}
              className="btn btn-success">Tạo</button>
              <button type="button" className="btn btn-secondary" 
              onClick={() => setShowForm(false)}>Đóng</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
function Detail({ content }) {
  return (
    <div className='col-md-10'>
      <h4><strong>{content.title}</strong></h4>
      <p><i className="bi bi-calendar-check"></i> {content.modifiedDate}</p>
      {content.content}
      <p style={{ float: 'right' }}><strong>Nguồn: </strong>{content.source}</p>
    </div>
  )
}

function Confirm({ setConfirm, setContents, delId }) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-exclamation-triangle-fill"></i> Xác nhận muốn xoá?
            </h5>
            <button type="button" className="btn-close"
              onClick={() => setConfirm(false)}
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p style={{ color: 'black' }}>Sau khi xoá dữ liệu sẽ không thể hiển thị ra màn hình!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning"
              onClick={() => { setContents(delId); setConfirm(false) }}>Xác nhận</button>
            <button type="button" className="btn btn-secondary"
              onClick={() => setConfirm(false)} data-bs-dismiss="modal">Đóng</button>

          </div>
        </div>
      </div>
    </div>
  )
}
function App() {
  const [contents, setContents] = useState([])
  const [id, setId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [delId, setDelId] = useState('')


  //call api
  useEffect(() => {
    fetch(`https://apis.resta.vn/erest-listing/news?status=Active&category=planningMapNews`)
      .then(response => response.json())
      .then(data => setContents(data.data))
  },[])

  return (
    <div className="container">
      {confirm && <Confirm
        setConfirm={confirm => setConfirm(confirm)}
        setContents={delId => setContents(
          prev => prev.filter(prev => prev.id !== delId)
        )}
        delId={delId} />
      }
      {showForm && <Form setShowForm={showForm => setShowForm(showForm)} />}
      {(id === '') &&
        <div className="row">
          <div>
            <a href='' className='add' onClick={e => { e.preventDefault(); setShowForm(!showForm) }}>
              <i className="bi bi-plus-circle-fill" ></i>
            </a>
          </div>
          {
            contents.map((content, index) => (
              <ViewList content={content} key={index} setId={id => setId(id)}
                setConfirm={setConfirm} setDelId={setDelId} />
            ))
          }
        </div> || <Detail content={contents.find(
          content => content.id == id)} />
      }
    </div>
  )
}

export default App;
