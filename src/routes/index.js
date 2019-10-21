const express = require('express')
const api = express.Router()

const pool = require('../database')
const{isLoggedIn,isAllowed}=require('../lib/auth')


api.get('/add',isLoggedIn,(req,res)=>{
    res.render('add')
})

api.post('/add',isLoggedIn,async (req,res)=>{
    const{first_name,last_name,company,job_title}=req.body
    const newCustomer = {
        first_name,
        last_name,
        company,
        job_title
    }
    await pool.query('INSERT INTO customers set ?',[newCustomer])
    req.flash('success','Cliente Agregado Con Exito')
    res.redirect('/links')
})

api.get('/',isLoggedIn,async(req,res)=>{
    const customers = await pool.query('SELECT * FROM CUSTOMERS');
    
    res.render('index',{customers})
})      

api.get('/delete/:id',isLoggedIn,isAllowed,async(req,res)=>{
    const{id}=req.params
    await pool.query('DELETE FROM customers WHERE id = ?',[id])
    req.flash('success','Cliente eliminado Con Exito')
    res.redirect('/links')
})

api.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params
    const customer = await pool.query('SELECT * FROM customers WHERE id = ?',[id])
    res.render('edit',{customer})
})

api.post('/edit/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params
    const {first_name,last_name,company,job_title} = req.body
    const newCustomer = {
        first_name,
        last_name,
        company,
        job_title
    }
    await pool.query('UPDATE customers set ? WHERE id = ?',[newCustomer,id])
    req.flash('success','Cliente actualizado Con Exito')
    res.redirect('/links')

})


module.exports = api