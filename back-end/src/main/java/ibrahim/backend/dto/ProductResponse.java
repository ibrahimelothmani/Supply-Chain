package ibrahim.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String sku;
    private String description;
    private String category;
    private BigDecimal price;
    private Integer reorderLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
