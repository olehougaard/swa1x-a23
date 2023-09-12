interface Sizable {
    int size();
}

interface Sized {
    int size();
}

class C implements Sized {
    public int size() {
        return 42;
    }
}

class Main {
    public static int getSize(Sizable s) {
        return s.size();
    }

    public static void main(String[] args) {
        C c = new C()
        System.out.println(getSize(c)); // ERROR: expects Sizable, not Sized.
    }
}
