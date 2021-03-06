class User < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence:true, uniqueness:true
    validates :session_token, presence:true, uniqueness:true
    validates :password_digest, :first_name, :last_name, presence:true
    validates :password, length: {minimum: 6, allow_nil:true}

    has_many :postings, 
        foreign_key: :author_id, 
        class_name: :Post

    has_many :schools, 
        foreign_key: :user_id, 
        class_name: :Education

    has_many :experiences,
        foreign_key: :user_id, 
        class_name: :Experience

    has_many :comments,
        foreign_key: :author_id, 
        class_name: :Comment

    has_one :profile,
        foreign_key: :user_id, 
        class_name: :Profile

    has_many :connections, 
        foreign_key: :connector_id, 
        class_name: :Connection

    has_many :connected, 
        foreign_key: :connected_id, 
        class_name: :Connection

    has_many :likes, 
        foreign_key: :liker_id, 
        class_name: :Like

    has_one_attached :avatar


    after_initialize :ensure_session_token
    attr_accessor :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def generate_session_token
        SecureRandom.urlsafe_base64
    end

    def ensure_session_token
        self.session_token ||= self.generate_session_token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
        self.session_token
    end
end
