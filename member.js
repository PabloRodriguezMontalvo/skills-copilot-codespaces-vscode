function skillsMember() {
    var member = {
        name: 'John',
        age: 30,
        skills: ['js', 'html', 'css'],
        salary: 2000
    };
    var skills = member.skills;
    for (var i = 0; i < skills.length; i++) {
        console.log(skills[i]);
    }
}