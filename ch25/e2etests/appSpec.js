describe('app', function(){

  it('counter should be initially zero', function(){

    browser.get('http://localhost:7996/angularspikes/ch25/app.html');

    var counter = element(by.binding('counter'));

    expect(counter.getText()).toEqual('Counter: 0');

  });

  it('counter should be increase', function(){

    browser.get('http://localhost:7996/angularspikes/ch25/app.html');

    var counter = element(by.binding('counter'));
    var button = element(by.css('button[ng-click]'));

    button.click();

    expect(counter.getText()).toEqual('Counter: 1');

  });

});