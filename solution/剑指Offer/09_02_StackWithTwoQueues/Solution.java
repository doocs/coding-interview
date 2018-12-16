/**
 * @author bingo
 * @since 2018/12/16
 */

class MyStack {

    private Queue<Integer> q1;
    private Queue<Integer> q2;

    /** Initialize your data structure here. */
    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    /** Push element x onto stack. */
    public void push(int x) {
        if (empty() || q2.isEmpty()) {
            q1.offer(x);
        } else {
            q2.offer(x);
        }
    }

    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        if (q1.isEmpty()) {
            while (q2.size() > 1) {
                q1.offer(q2.poll());
            }
            return q2.poll();
        }

        while (q1.size() > 1) {
            q2.offer(q1.poll());
        }
        return q1.poll();
    }

    /** Get the top element. */
    public int top() {
        int val = pop();
        push(val);
        return  val;
    }

    /** Returns whether the stack is empty. */
    public boolean empty() {
        return q1.isEmpty() && q2.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */