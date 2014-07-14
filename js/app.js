angular.module('documents4j', ['ngRoute', 'ui.bootstrap', 'duScroll'])

    .value('duScrollDuration', 2000)

    .constant('repository', {
        groupId: 'com.documents4j',
        artifactId: 'documents4j',
        version: '0.2'
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainController',
                templateUrl: 'partial/main.partial.html'
            })
            .when('/develop', {
                controller: 'developController',
                templateUrl: 'partial/develop.partial.html'
            })
            .otherwise({redirectTo: '/'});
    })

    .directive('prettyprint', function () {
        return {
            restrict: 'C',
            link: function postLink(scope, element) {
                element.html(prettyPrintOne(element.html(), '', true));
            }
        };
    })

    .controller('menuController', function ($scope, $location, $rootScope, scroller, repository) {
        $scope.menuItems = [
            {name: 'Use', target: '#/'},
            {name: 'Develop', target: '#/develop'},
            {name: 'API', target: 'javadoc/' + repository.version + '/index.html'}
        ];
        $scope.activeClass = function (current) {
            return current.target === '#' + ($location.path() || '/') ? 'active' : '';
        };
        var collapsed = true;
        $scope.isCollapsed = function () {
            return collapsed;
        };
        $scope.toggleCollapse = function () {
            collapsed = !collapsed;
        };
        $scope.collapse = function () {
            collapsed = true;
        };
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            scroller.scrollTo(0, 0, 1500);
        });
    })

    .controller('socialMediaController', function ($scope) {
        $scope.icons = [
            {name: 'Google', style: 'google', target: 'https://plus.google.com/share?url=http%3A%2F%2Fdocuments4j.com'},
            {name: 'LinkedIn', style: 'linkedin', target: 'https://www.linkedin.com/shareArticle?mini=true&url=documents4j.com&title=A%20document%20format%20converter%20for%20Java&summary=documents4j%20is%20a%20Java%20library%20for%20converting%20documents%20into%20another%20document%20format.%20This%20is%20achieved%20by%20delegating%20the%20conversion%20to%20any%20native%20application%20which%20understands%20the%20conversion%20of%20the%20given%20file%20into%20the%20desired%20target%20format.%20documents4j%20comes%20with%20adaptations%20for%20MS%20Word%20and%20MS%20Excel%20for%20Windows%20what%20allows%20for%20example%20for%20the%20conversion%20of%20a%20docx%20file%20into%20a%20pdf%20file%20without%20the%20usual%20distortions%20in%20the%20resulting%20document%20which%20are%20often%20observed%20for%20conversions%20that%20were%20conducted%20using%20non-Microsoft%20products.'},
            {name: 'Twitter', style: 'twitter', target: 'https://twitter.com/intent/tweet?source=webclient&text=Check%20out%20%23documents4j%2C%20a%20library%20for%20converting%20documents%20into%20another%20document%20format%20%28http%3A%2F%2Fdocuments4j.com%29'},
            {name: 'Stack Overflow', style: 'stackover', target: 'http://stackoverflow.com/questions/tagged/documents4j'},
            {name: 'GitHub', style: 'github', target: 'https://github.com/documents4j/documents4j'},
            {name: 'Facebook', style: 'facebook', target: 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fdocuments4j.com'},
            {name: 'Reddit', style: 'reedit', target: 'http://www.reddit.com/submit?url=http%3A%2F%2Fdocuments4j.com'}
        ];
    })

    .controller('mainController', function ($scope, repository) {
        $scope.version = repository.version;
        $scope.tabs = [
            { title: 'Maven', content: '<dependency>\n  <groupId>'
                + repository.groupId + '</groupId>\n  <artifactId>'
                + repository.artifactId + '</artifactId>\n  <version>'
                + repository.version + '</version>\n</dependency>' },
            { title: 'Gradle', content: repository.groupId + ':'
                + repository.artifactId + ':'
                + repository.version },
            { title: 'SBT', content: 'libraryDependencies += "'
                + repository.groupId + '" % "'
                + repository.artifactId + '" % "'
                + repository.version + '"' },
            { title: 'Ivy', content: '<dependency org="'
                + repository.groupId + '" name="'
                + repository.artifactId + '" rev="'
                + repository.version + '" />' },
            { title: 'Buildr', content: '\'' + repository.groupId + ':'
                + repository.artifactId + ':jar:'
                + repository.version + '\'' },
            { title: 'Grape', content: '@Grapes(\n  @Grab(group=\''
                + repository.groupId + '\', module=\''
                + repository.artifactId + '\', version=\''
                + repository.version + '\')\n)' },
            { title: 'Leiningen', content: '[' + repository.groupId + '/' 
                + repository.artifactId + ' "' 
                + repository.version + '"]' }
        ];
    })

    .controller('developController', function ($scope) {
    });
