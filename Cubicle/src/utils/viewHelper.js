exports.selectLevel = function (difficultyLevel) {
    let titles = ['Very Easy', 'Easy', 'Medium (Standard 3x3)', 'Intermediate', 'Expert', 'Hardcore'];

    let options = titles.map((title, i) => ({
        title: `${i + 1} - ${title}`,
        value: i + 1,
        selected: Number(difficultyLevel) === i + 1,
    }));

    return options;
};
