const express = require('express');
const User = require('../../models/user');
var ObjectID = require('mongodb').ObjectID;
const createUser = async (req, res) => {

    if (req.body.emailId && req.body.name) {
        const user = await User.findOne({ emailId: req.body.emailId })
        if (!user) {
            User.create({ emailId: req.body.emailId, name: req.body.name }).then(function (user) {
                return res.status(201).json({ data: user });
            });
        }
        else {

            return res.status(400).send({
                message: 'User with same emailId exists!'
            });


        }

    }
    else if (!req.body.name || !req.body.emailId) {
        return res.status(422).json({ message: 'The fields name and emailId are required' });
    }
};




const getUser = async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            message: 'Please Provide Right User ID!'
        });
    }
    else {
        if (id) {
            const user = await User.findOne({ _id: id })
            if (user != null) {
                User.find({ _id: id }).then(function (user) {
                    return res.status(200).json({ data: user });
                });
            }
            else {
                return res.status(404).json({ message: `User with id "${id}" not found.` });

            }
        }
        else {
            return res.status(400).send({
                message: 'No UserId Provided!'
            });

        }
    }
};

const getUsers = async (req, res) => {
    User.find({}).then(function (users) {
        return res.status(200).json({ data: users });
    });
};



const updateUser = async (req, res) => {
    const { name, emailId } = req.body;
    const { id } = req.params;

    if (!name || !emailId) {
        return res.status(422).json({ message: 'The fields name and emailId are required' });
    }

    else {
        if (!ObjectID.isValid(id)) {
            return res.status(400).send({
                message: 'Please Provide Right User ID!'
            });
        }
        else {
            const user = await User.findOne({ _id: id })
            if (user) {

                User.findOneAndUpdate({ _id: id }, req.body).then((user) => {
                    return res.status(201).json({ data: user });
                })

            }
            else {
                return res.status(404).json({ message: `User with id "${id}" not found.` });
            }


        }
    }

};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            message: 'Please Provide Right User ID!'
        });
    }
    else {
        const user = await User.findOne({ _id: id })
        if (user) {
            User.findOneAndDelete({ _id: id }).then((user) => {
                return res.status(200).json({ data: user });
            })
        }
        else {
            return res.status(404).send({
                message: 'No User Found To Delete!'
            });
        }
    }
};

const transferAmount = async (req, res) => {
    const { senderId, receiverId, amount } = req.params;
    if (!ObjectID.isValid(senderId)) {
        return res.status(400).send({
            message: 'Please Provide Right Sender User ID!'
        });
    }
    else if (!ObjectID.isValid(receiverId)) {
        return res.status(400).send({
            message: 'Please Provide Right Receiver User ID!'
        });
    }
    else {
        const senderUser = await User.findOne({ _id: senderId })
        const receiverUser = await User.findOne({ _id: receiverId })
        if (!senderUser) {
            return res.status(404).send({
                message: `Sender User Doesn't Exist!`
            });
        }

        else if (!receiverUser) {
            return res.status(404).send({
                message: `Receiver User Doesn't Exist!`
            });
        }

        else if (!amount) {
            return res.status(404).send({
                message: `Transfer Amount Is Not Provided!`
            });
        }
        else if (isNaN(amount) || amount <= 0) {
            return res.status(404).send({
                message: `Transfer Amount Is Not Viable!`
            });
        }
        else if (senderUser.coinBalance >= amount) {
            const promise1 = User.findOneAndUpdate({ _id: senderId }, { coinBalance: Number(senderUser.coinBalance) - Number(amount) })
            const promise2 = User.findOneAndUpdate({ _id: receiverId }, { coinBalance: Number(receiverUser.coinBalance) + Number(amount) })
            Promise.all([promise1, promise2]).then(() => {
                return res.status(200).json({ message: `Amount transferred successfully from ${senderId} to ${receiverId}` })

            });
        }
        else if (senderUser.coinBalance < amount) {
            return res.status(404).send({
                message: 'Insufficient Balance!'
            });
        }

    }
};

const checkBalance = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: 'No User Id provided!'
        });
    }
    else if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            message: 'Please Provide Right User ID!'
        });
    }
    else {
        const user = await User.findOne({ _id: id })
        if (user != null) {
            User.find({ _id: id }).then(() => {
                res.status(201).json({ "coinBalance": user.coinBalance });
            })
        }
        else {
            return res.status(404).send({
                message: 'No User Found!'
            });

        }
    }

};
module.exports = { createUser, getUser, getUsers, updateUser, deleteUser, transferAmount, checkBalance };