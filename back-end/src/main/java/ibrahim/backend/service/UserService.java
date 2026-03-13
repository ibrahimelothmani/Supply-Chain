package ibrahim.backend.service;

import ibrahim.backend.entity.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    String addUser(User user);
    String updateUser(User user);
    void deleteUser(Long id);
}