package ibrahim.backend.mapper;

import ibrahim.backend.dto.ProductRequest;
import ibrahim.backend.dto.ProductResponse;
import ibrahim.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice() != null ? BigDecimal.valueOf(request.getPrice()) : BigDecimal.ZERO);
        product.setReorderLevel(request.getReorderLevel() != null ? request.getReorderLevel() : 0);
        return product;
    }

    public ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .description(product.getDescription())
                .category(product.getCategory())
                .price(product.getPrice())
                .reorderLevel(product.getReorderLevel())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public void updateEntity(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        if (request.getPrice() != null) {
            product.setPrice(BigDecimal.valueOf(request.getPrice()));
        }
        if (request.getReorderLevel() != null) {
            product.setReorderLevel(request.getReorderLevel());
        }
    }
}
