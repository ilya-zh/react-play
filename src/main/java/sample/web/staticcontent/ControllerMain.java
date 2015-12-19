package sample.web.staticcontent;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Class description here
 *
 * @author Ilya Zhuravliov, Date: 19/12/2015
 */

@Controller
public class ControllerMain
{
  @RequestMapping("/")
  public String home()
  {
    return "index.html";
  }
}
