const { GraphQLObjectType,
    GraphQLString,
	GraphQLInt
} = require('graphql');


const movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
		link: { type: GraphQLString },
		metascore: { type: GraphQLInt },
		synobsis: { type: GraphQLString },
        title: { type: GraphQLString },
        year: { type: GraphQLInt }

    }
});

//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movies: {
            type: GraphQLString,

            resolve: function () {
				
                return "You choose \"movies\"";
            }
        },
		movie: {
			type: GraphQLString,
            resolve: function (source, args, context) {
				return context.db
					.aggregate([
					{$match : { "metascore" : {$gte : 70}}},
					{ $sample: { size: 1 } }]);

            }
		}
    }
});

exports.queryType = queryType;