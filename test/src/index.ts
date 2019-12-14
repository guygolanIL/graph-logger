import { Logged } from "graph-logger/decorators/Logged";

class TestClass {

    @Logged()
    public yoog(name: string, anotherName: string){
        console.log(`Yoog! ${name} ${anotherName}`);
    }

    @Logged()
    public yay(amount: number){
        console.log(`Yay ${amount}`);
    }
}

const testClass: TestClass = new TestClass();
testClass.yoog("guy", "golan");
testClass.yay(5);
