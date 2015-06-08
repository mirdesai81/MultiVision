/**
 * Created by Mihir.Desai on 5/29/2015.
 */
describe('mvUser',function(){
   beforeEach(module('app'));
    describe('isAdmin',function(){
        it("should return false if user role is not admin",inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;

        }));
        it("should return true if user role is admin",inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;

        }));
    });

});
