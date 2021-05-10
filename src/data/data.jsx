const pools = [
    {
        id: '1',
        title: 'What is your favorite programming language',
        description: 'There are lot of programming language in this world.Among them what is your favorite?',
        options: [
            { id: '123', value: 'C', vote: 0 },
            { id: '124', value: 'C++', vote: 0 },
            { id: '125', value: 'Javascript', vote: 0 },
            { id: '126', value: 'Rust', vote: 0 },
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    },
    {
        id: 2,
        title: 'Which frontend framwork do you prefer',
        description: 'There are lot of frontend frarework in Javascript.Among them what is your favorite?',
        options: [
            { id: '222', value: 'React js', vote: 0 },
            { id: '333', value: 'Angular js', vote: 0 },
            { id: '444', value: 'Vue js', vote: 0 },
            { id: '555', value: 'Svelte', vote: 0 },
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    },
    {
        id: 3,
        title: 'What is the best way to create android app',
        description: 'There are lot of ways to crate an android app.So which one you prefer',
        options: [
            { id: '44', value: 'Java', vote: 0 },
            { id: '332', value: 'React native', vote: 0 },
            { id: '321', value: 'Kotlin', vote: 0 },
        ],
        created: new Date(),
        totalVote: 0,
        opinions: []
    },

]

export default pools;