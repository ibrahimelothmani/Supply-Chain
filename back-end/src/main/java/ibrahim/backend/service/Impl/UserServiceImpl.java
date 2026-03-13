package ibrahim.backend.service.Impl;

import ibrahim.backend.entity.User;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.repository.UserRepository;
import ibrahim.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    @Override
    public String addUser(User user) {
        User savedUser = repository.save(user);
        return "User added successfully with ID: " + savedUser.getId();
    }

    @Override
    public String updateUser(User user) {
        User existingUser = repository.findById(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", user.getId()));
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        repository.save(existingUser);
        return "User updated successfully with ID: " + existingUser.getId();
    }

    @Override
    public void deleteUser(Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        repository.delete(user);
    }
}