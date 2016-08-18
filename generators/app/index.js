'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-st-up') + ' generator!'
    ));

    // Promts additional data
    function childDirFlagCondition(answers) {
      return answers.projectName !== this.appname;
    }
    childDirFlagCondition.bind(this);

    var scmChoices = [
      {name: 'Git', value: 'git'},
      {name: 'Mercurial', value: 'hg'}
    ];

    // Prompts description
    var prompts = [
      {

        // ------------------------------------------------ Project name prompt
        type: 'input',
        name: 'projectName',
        message: 'Title your project somehow.',
        default: this.appname
      }, {

        // ------------------------------------------------ Licence prompt
        type: 'confirm',
        name: 'license',
        message: 'Wanna use a MIT license?',
        default: true
      }, {

        // ------------------------------------------------ SCM prompt
        type: 'list',
        name: 'scm',
        message: 'What SCM do you prefere? (consider you have allready installed SCM you choose)',
        choices: scmChoices
      }, {

        // ------------------------------------------------ SCM repository prompt
        type: 'input',
        name: 'repo',
        message: 'Have a repository? Tell me the URL.',
        default: 'Not specified'
      }
    ];

    // To access props later use this.props.someAnswer
    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default: function () {
  },

  writing: function () {
    // var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    // copying sublime project file
    this.fs.copy(
      this.templatePath('dummy.sublime-project'),
      this.destinationPath(this.props.projectName + '.sublime-project')
    );

    // copying license file
    if (this.props.license) {
      this.fs.copyTpl(
        this.templatePath('license/mit'),
        this.destinationPath('LICENSE.md'),
        {
          thisYear: (new Date()).getYear(),
          author: 'Yoyoyo',
          authorHomepage: 'Lololo'
        }
      );
    }

    // copying selected scm files
    this.fs.copy(
      this.templatePath('scm/' + this.props.scm + '/ignore'),
      this.destinationPath('.' + this.props.scm + 'ignore')
    );
  },

  install: function () {
    // this.installDependencies();
    this.spawnCommandSync(this.props.scm, ['init']);
    if (this.props.repo !== 'Not specified') {
      if (this.props.scm === 'git') {
        this.spawnCommandSync(this.props.scm, ['remote', 'add', 'origin', this.props.repo]);
        this.spawnCommandSync(this.props.scm, ['remote', 'add', 'upstream', this.props.repo]);
      } else if (this.props.scm === 'hg') {
        this.fs.copyTpl(
          this.templatePath('scm/hg/hgrc'),
          this.destinationPath('.hg/hgrc'),
          {
            url: this.props.repo,
            appname: this.appname
          }
        );
      }
    }
  }
});
