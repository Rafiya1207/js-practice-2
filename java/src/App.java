import com.step.people.Rashmika;
import com.step.planets.Planet;
import com.tw.models.Employee;
import com.tw.services.employee.EmployeeService;


class App {
  public static void main() {
    Rashmika a = new Rashmika("Amisha", 123);
    System.out.println(a.getName());
    Employee employee = new Employee("bob", 101);
    EmployeeService employeeService = new EmployeeService();

    System.out.println(employeeService.getEmployeeInfo(employee));

    Planet planet = Planet.MARS;

    System.out.println(Planet.valueOf("MERCURY"));
    System.out.println(Planet.MERCURY.getPlanet());
    System.out.println(Planet.MERCURY.name());
  }
  
}