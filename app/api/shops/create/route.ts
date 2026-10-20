import { connectDB } from "@/lib/database";
import { Shop } from "@/models/Shop";
import { withErrorHandler } from "@/lib/errorHandler";
import { ResponseJson, ResponseError } from "@/lib/responseHandler";
import { getCoordinatesFromAddress } from "@/utils/geocoder";
import { shopSchema } from "@/validators/shops";
import { withAuth } from "@/utils/auth-guard";

export const POST = withErrorHandler(
  withAuth(async (req, user) => {
    await connectDB();

    const body = await req.json();

    const result = shopSchema.safeParse(body);
    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || "Validation failed";
      return ResponseError(errorMessage, 400);
    }

    const {
      shopName,
      contactNumber,
      category,
      description,
      address,
      isDeliveryAvailable,
      openingHours,
      images,
    } = result.data;

    const existingByPhone = await Shop.findOne({ contactNumber });
    if (existingByPhone) {
      return ResponseError(
        "A shop with this contact number is already registered.",
        400,
      );
    }

    const coordinates = await getCoordinatesFromAddress(
      address.fullAddress,
      address.city,
      address.state,
      address.pinCode,
    );

    const shop = await Shop.create({
      seller: user.id, // Handed directly to you safely!
      shopName,
      contactNumber,
      category: category.toLowerCase(),
      description,
      address: {
        ...address,
        coordinates: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat],
        },
      },
      isDeliveryAvailable,
      openingHours,
      images,
    });

    return ResponseJson({
      success: true,
      message: "Shop created successfully!",
      shop,
    });
  })
);