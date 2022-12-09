// const {projects, clients} = require('../sampleData.js'); dummy data file
const Project = require('../models/Project');
const Client = require('../models/Client');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql');

//The Projects
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                // return clients.find((client) => client.id === parent.clientId);
                return Client.findById(parent.clientId);
            },
        },
    }),
});

// The Clients
const ClientType = new GraphQLObjectType({
    name:'Client',
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // return projects; // this if you want to querry the dummy data file
                return Project.find(); // querries the mongoose file that sits right above the db
            },
        },
        project:{
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return projects.find((project) => project.id === args.id)
                return Project.findById(args.id);
            },
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
            // return clients;
            return Client.find();
            }
        },
        client:{
            type: ClientType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {  // resolve is like response in REST
                // return clients.find(client => client.id === args.id)
                return Client.findById(args.id)
            }
        }
    }
})


// MUTATIONS
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add 1 Client
        addClient: {
            type: ClientType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString) },
                email: {type: new GraphQLNonNull(GraphQLString) },
                phone: {type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client ({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            },
        },
        // delete 1 Client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            },
        },
        // Add 1 Project
        addProject: {
            type: ProjectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        'new': {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                        'completed': {value: 'Completed' },
                        }
                    }),  
                defaultValue: 'Not Started',
                },
            clientId: { type: new GraphQLNonNull(GraphQLID) },
            },
        resolve(parent, args) {
            const project = new Project({
                name: args.name,
                description: args.description,
                status: args.status,
                clientId: args.clientId,
                });
            return project.save();
            },
        },
        // Delete 1 Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                return Project.findByIdAndRemove(args.id);
            },
        },
        // Update 1 Project
        updateProject: {
            type: ProjectType,
            args: {
                id:{ type: new GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString},
                description: { type: GraphQLString},
                status: { type: new GraphQLEnumType({
                    name: 'ProjectStatusUpdate',
                    values: {
                        'new': {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                        'completed': {value: 'Completed' },
                        }
                    }), 
                },
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {new: true}
                );
            }
        }
    }
},);


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})