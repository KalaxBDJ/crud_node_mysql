const express = require('express')
const api = express.Router()

const pool = require('../database')
const{isLoggedIn,isAllowed}=require('../lib/auth')


api.get('/add',isLoggedIn,(req,res)=>{
    res.render('add')
})

api.post('/add',isLoggedIn,async (req,res)=>{
    const{name,id_employee,city}=req.body
    const newDepartment = {
        name,
        id_employee,
        city
    }
    await pool.query('INSERT INTO departments set ?',[newDepartment])
    req.flash('success','Departamento Agregado Con Exito')
    res.redirect('/links')
})

api.get('/',isLoggedIn,async(req,res)=>{
    const departments = await pool.query('SELECT * FROM departments');
    
    res.render('index',{departments})
})      

api.get('/delete/:id',isLoggedIn,isAllowed,async(req,res)=>{
    const{id}=req.params
    await pool.query('DELETE FROM departments WHERE id = ?',[id])
    req.flash('success','Cliente eliminado Con Exito')
    res.redirect('/links')
})

api.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params
    const departments = await pool.query('SELECT * FROM departments WHERE id = ?',[id])
    res.render('edit',{departments})
})

api.post('/edit/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params
    const {name,id_employee,city} = req.body
    const newDepartment = {
        name,
        id_employee,
        city
    }
    await pool.query('UPDATE departments set ? WHERE id = ?',[newDepartment,id])
    req.flash('success','Departamento actualizado Con Exito')
    res.redirect('/links')

})


module.exports = api