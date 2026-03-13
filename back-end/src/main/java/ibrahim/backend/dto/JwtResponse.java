package ibrahim.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {

    private String token;
    @Builder.Default
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
}
