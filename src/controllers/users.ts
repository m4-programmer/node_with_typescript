import express from "express";

import {deleteUserById, getUsers, updateUserById} from '../db/users';

export const getAllUsers =async (req: express.Request, res: express.Response,) => {
    try {
        const users = await getUsers();


        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}

export const deleteUser =async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        
        if (!deleteUser) {
            return res.sendStatus(403);
        }


        return res.json(deleteUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}

export const updateUser =async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const {username} = req.body    
        
        const user = await updateUserById(id, username);
        
        if (!user) {
            return res.sendStatus(403);
        }

        user.username = username;
        await user.save();

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}